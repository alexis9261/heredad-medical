require('./bootstrap');

//----------------- UI cart class --------------


class CarritoUI {
  constructor(carrito, cart_body, dom) {
    this.cart_body = cart_body;
    this.carrito = carrito;
    this.badge_main = document.getElementById('carritoDropdown')
    this.total = 0;
    this.totalCantidades = 0
    this.urlProductos = ''
    this.mainDom= dom
    //this.carritoEventos()
  }


  agregarCarrito(productos)
  {
    this.totalCantidades = 0;
  	this.total = 0;
  	if(productos.length > 0)
  	{
      this.cart_body.classList.remove('vacio')
  		this.cart_body.innerHTML = '';
  		let contador = 0;
  		productos.forEach(producto => {
  			this.total = this.total + (onlyPrice(producto.price) * producto.cantidad)
  			if(contador === 0) {
  				this.urlProductos = `${producto.cantidad} x ${producto.title} - ${producto.price}`
  			}else {
  				this.urlProductos = `${this.urlProductos}%0A%0A${producto.cantidad} x ${producto.title} - ${producto.price}`
  			}

        	this.totalCantidades += producto.cantidad

  			let template = ''
  			if(producto.producto){
  				template = `
				<div class="product_main row">
					<div class="col-2">
						<div class="container_img_modal_cart">
							<img class="img_modal_cart" src="${producto.image}" alt="Imagen Producto en carrito">
						</div>
					</div>
					<div class="col-10 px-0 pl-4">
						<div class="row align-items-center">
							<span class="title_modal_cart mr-3">${producto.title} </span>
							<span class="price_modal_cart"> ${producto.price} $</span>
						</div>
						<div class="row align-items-center mt-2">
							<div class="col-auto mr-3 px-0">
								<span class="cantidad_modal_cart">Cantidad:</span>
							</div>
							<div class="col-6 col-md-2">
								<select class="form-control cantidad_producto_cart">
									<option class="cantidad_opcion" ${producto.cantidad == 1 ? 'selected' : ''}>1</option>
									<option class="cantidad_opcion" ${producto.cantidad == 2 ? 'selected' : ''}>2</option>
									<option class="cantidad_opcion" ${producto.cantidad == 3 ? 'selected' : ''}>3</option>
									<option class="cantidad_opcion" ${producto.cantidad == 4 ? 'selected' : ''}>4</option>
									<option class="cantidad_opcion" ${producto.cantidad == 5 ? 'selected' : ''}>5</option>
									${producto.cantidad > 5 ? `<option class="cantidad_opcion" value="${producto.cantidad}" selected>${producto.cantidad}</option>` : '' }
								</select>
							</div>
						</div>
						<input type="hidden" value="${producto.id}">
					</div>
			  	</div>
  				`;
  			}else{
  				template = `
	    			<div class="product_main row mb-3 mx-2">
	    			    <span class="close_product_modal eliminar_producto" id="${producto.id}">
	    			        <i class="fas fa-times eliminar_producto" id="${producto.id}"></i>
	    			    </span>
	    			    <div class="col-2">
	    			        <div class="row">
	    			            <div class="container_img_modal_cart">
	    			                <img class="img_modal_cart" src="${producto.image}" alt="Imagen Producto en carrito">
	    			            </div>
	    			        </div>
	    			    </div>
	    			    <div class="col-10 px-0 pl-4">
	    			        <div class="row align-items-center">
	    			            <span class="title_modal_cart mr-3">${producto.title}</span>
	    			            <span class="price_modal_cart"> ${producto.price} $</span>
	    			        </div>
	    			        <div class="row align-items-center mt-2">
	    			            <div class="col-auto mr-3 px-0">
	    			                <span class="cantidad_modal_cart">Cantidad:</span>
	    			            </div>
	    			            <div class="col-6 col-md-2">
	    			                <select class="form-control cantidad_producto_cart" id="${producto.id}">

	    			                </select>
	    			            </div>
	    			        </div>
	    			        <input type="hidden" value="${producto.id}">
	    			    </div>
	    			</div>
  				`;
  			}

  			this.cart_body.innerHTML+= template;

  			contador++
  		})
  		this.boton_modal = document.getElementById('boton_modal');
  		this.boton_vaciar = document.getElementById('vaciar_carrito_cart');
  		this.botones_cantidad = document.querySelectorAll('.cantidad_producto_cart');
  		this.boton_eliminar = document.querySelectorAll('.eliminar_producto');

		this.boton_modal.style.display = 'inline-block'
		this.boton_vaciar.style.display = 'inline-block'

  		this.boton_modal.addEventListener('click', () => {
  			let productosUrl = document.getElementById('productos_modal')
  			let totalProductos = document.getElementById('total_modal')

  			productosUrl.value =  this.urlProductos

  			totalProductos.value = this.total
  		})

  		this.boton_vaciar.addEventListener('click', function() {
  			vaciarCarrito()
  		})

  		this.botones_cantidad.forEach(boton => {
  			boton.addEventListener('change', function(e){
  			 	carritoCantidad(e.target)

  			})
  			verificarCantidadProducto(boton.id, boton)
  		})

  		this.boton_eliminar.forEach(boton => {
  			boton.addEventListener('click', function(e){
  			 	eliminarDelCarrito(e.target.id)
  			})
  		})


  		this.badge_main.innerHTML = `<i class="fas fa-shopping-cart"></i>`


		this.badge_main.innerHTML += `
			<div id="carrito_badge" style="position: absolute; top: -10px; right: 0;">
			  	<span class="badge badge-dark">${this.totalCantidades}</span>
			</div>
		`

		this.cart_float_container = document.getElementById('container_float')
		this.cart_float_container.innerHTML = `<i id="cart_icon_id" class="fas fa-shopping-cart"></i>`
		this.cart_float_container.innerHTML += `
			<div id="carrito_badge" style="position: absolute; top: 1px; right: 0;">
			  	<span class="badge_button_float_quantity">${this.totalCantidades}</span>
			</div>
		`

  		this.carrito.children[0].children[0].classList.add('cart_on')

  	}else {
      	this.boton_modal = document.getElementById('boton_modal');
      	this.boton_vaciar = document.getElementById('vaciar_carrito_cart');
      	this.cart_float_container = document.getElementById('container_float');

  		this.cart_body.innerHTML = 'No hay productos en el carrito';

  		this.carrito.children[0].children[0].classList.remove('cart_on')
  		this.badge_main.innerHTML = `<i class="fas fa-shopping-cart"></i>`

  		this.cart_float_container.innerHTML = `<i id="cart_icon_id" class="fas fa-shopping-cart"></i>`
      	this.boton_modal.style.display = 'none'
      	this.boton_vaciar.style.display = 'none'
  	}

  }

  addingAlert(alert){

  	alert.style.display = 'block';

  	setTimeout( () => {
  		alert.style.display = 'none';
  	}, 1500);
  }


  totalCart(productos, container, value){
  	let total_amount = 0;
  	container.innerHTML = '';

  	if(productos.length > 0){

  		if(value == 1){
  			productos.forEach(producto => {
  				let precio = producto.producto.price,
  					precio_total = precio * producto.cantidad;

  				total_amount = total_amount + precio_total


  				container.innerHTML += `
  					<div class="d-flex mb-3">
  						<div class=" mr-2">
  							<img src="/storage/${producto.imagen}" style="width: 60px; height: 60px; object-fit: cover;">
  						</div>
  						<div class="d-flex" style="justify-content: space-between; flex:1;">
  							<div>
  								<h5 class="outspacing">${producto.producto.title}</h5>
  								<p class="outspacing"><strong>Cantidad: ${producto.cantidad}</strong></p>
  								<p class="outspacing"><strong>Precio: ${precio}</strong></p>
  							</div>

  							<div>
  								<h5 class="outspacing">Total: <small>${precio_total} $</small></h5>
  							</div>
  						</div>

  					</div>
  				`
  			})
  		}

  		if(value == 0){
  			console.log('sin sesion')

  			productos.forEach(producto => {
  				let precio = producto.price;

  				let cadena = precio.split(" ");

  				precio = cadena[0] * producto.cantidad;

  				total_amount = total_amount + precio


  				container.innerHTML += `
  					<div class="d-flex mb-3">
  						<div class=" mr-2">
  							<img src="${producto.image}" style="width: 60px; height: 60px; object-fit: cover;">
  						</div>
  						<div class="d-flex" style="justify-content: space-between; flex:1;">
  							<div>
  								<h5 class="outspacing">${producto.title}</h5>
  								<p class="outspacing"><strong>Cantidad: ${producto.cantidad}</strong></p>
  								<p class="outspacing"><strong>Precio: ${producto.price}</strong></p>
  							</div>

  							<div>
  								<h5 class="outspacing">Total: <small>${precio} $</small></h5>
  							</div>
  						</div>

  					</div>
  				`
  			})
  		}

  		container.innerHTML += `
  			<div>
  				<h5>Total a pagar: <strong>${total_amount}$</strong></h5>
  			</div>
  		`
  	}
  }

}

//----------------- API CALLS class --------------

class CartApi {
	async getCart(){
		return axios.get('/cart')
	}

	async addToCart(id){

		return axios.post(`/cart/add`, {
			product_id: id,
		})

	}
}




//----------------- LocalSorage class --------------


class Storage{
	constructor()
	{
		this.storage = '';
	}


	getStorage(){
		let datos = localStorage.getItem('carrito');
		let cart = JSON.parse(datos)


		if(cart)
		{

			this.storage = cart;
			return this.storage


		}else {
			let cartBody = [];

			localStorage.setItem('carrito', JSON.stringify(cartBody));

			cart = localStorage.getItem('carrito');
			this.storage = JSON.parse(cart)
			return this.storage
		}
	}


	async addStorage(products)
	{
		localStorage.setItem('carrito', JSON.stringify(products));
	}

}





//-------------------- Declaracion de variables -----------------
const total_container = document.getElementById('total_container');
const formEnviarWhatsapp = document.getElementById('form_modal_whatsapp');
let cart_main = document.getElementById('cart_main'),
    cart_body = document.getElementById('cart_body'),
    session = document.getElementById('sesion');

let productos = [];

//-------------------- Inicio de clases -----------------

let storage = new Storage();
let carrito = new CarritoUI(cart_main, cart_body, window);
let apiCart = new CartApi();



//-------------------- inicio de script -----------------

formEnviarWhatsapp.addEventListener('submit', (e) => {
    e.preventDefault()

    let name = document.getElementById('form_name').value;
    let pedidoId = document.getElementById('pedido_id');
    axios.post('/crear/pedido', {
      name,
      total_amount: carrito.total,
      productos: productos
    })
      .then(res => {
        if(res.status === 200){
          pedidoId.value = res.data;
          productos = []
          storage.addStorage(productos)
          e.target.submit();
        }
      })
})



	//-------------------- Sesion no iniciada-----------------
if(session.value == 0)
{
	productos = storage.getStorage();
	let buttonsStorage = document.querySelectorAll('.to_storage'),
		buttonsVerStorage = document.querySelectorAll('.ver_storage');

	carrito.agregarCarrito(productos);

	if(buttonsStorage)
	{
		events(session.value, buttonsStorage);
	}

	if(buttonsVerStorage){
		events(2, buttonsVerStorage);
	}
}

	//-------------------- Sesion iniciada -----------------

if(session.value == 1){
	let	buttonsServer = document.querySelectorAll('.to_server');

	productos = storage.getStorage();
	addingStorageToServer(productos);

	// apiCart.getCart()
	// 	.then(res => {
	// 		productos = res.data
	// 		carrito.agregarCarrito(productos)
	// });


	if(buttonsServer)
	{
		events(session.value, buttonsServer);
	}

}



//-------------------- Agregar productos -----------------

function events(value, elements)
{

	//-------------------- LocalStorage -----------------

	if(value == 0)
	{
		elements.forEach(element => {
			element.addEventListener('click', (e) => {
                console.log(e.target)
				let name = e.target.parentNode.parentNode.children[0].children[1].children[0].textContent,
					id = e.target.id,
					price = e.target.parentNode.parentNode.children[0].children[2].children[0].textContent,
					image = e.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].src,
					slug = e.target.parentNode.parentNode.children[3].value,
					cantidad = parseFloat(e.target.parentNode.children[0].value),
					alert = document.getElementById('add_alert');


				let producto = {title: name, id: id, image: image, price: price, cantidad: cantidad, link: slug}

				let verify = verifyProduct(producto);
				if(verify){
					productos.push(producto);
				}


				storage.addStorage(productos)
					.then(res => {
						carrito.agregarCarrito(productos);

						let messageSuccess = document.getElementById("message_success");
						messageSuccess.style.visibility = "visible";
						messageSuccess.style.opacity = "1";
						messageSuccess.classList.add('transitionClean');
						setTimeout(hiddenMessageAddProduct,2250);
                        function hiddenMessageAddProduct(){
                            messageSuccess.style.opacity = "0";
                            messageSuccess.style.visibility = "hidden";
                            messageSuccess.classList.remove('transitionClean');
                        }
					})
			});
		});
	}

	//--------------------Vista producto LocalStorage -----------------
	if(value == 2){
		elements.forEach(element => {
			element.addEventListener('click', (e) => {
				let id = e.target.id,
					name = e.target.parentNode.parentNode.parentNode.children[1].textContent,
					price = e.target.parentNode.parentNode.parentNode.children[2].children[0].textContent,
					image = e.target.parentNode.parentNode.parentNode.parentNode.children[1].children[0].children[0].children[0].src,
					slug = e.target.parentNode.parentNode.parentNode.children[3].value,
					cantidad = parseFloat(e.target.parentNode.parentNode.children[0].children[0].children[0].value),
					alert = document.getElementById('add_alert');


				let producto = {title: name, id: id, image: image, price: price, cantidad: cantidad, link: slug}

				let verify = verifyProduct(producto);
				if(verify){
					productos.push(producto);
				}


				storage.addStorage(productos)
					.then(res => {
						carrito.agregarCarrito(productos);

						//carrito.addingAlert(alert);
						let messageSuccess = document.getElementById("message_success");
						console.log(messageSuccess);
						messageSuccess.style.visibility = "visible";
						messageSuccess.style.opacity = "1";
						messageSuccess.classList.add('transitionClean');
						setTimeout(hiddenMessageAddProduct,2250);
							function hiddenMessageAddProduct(){
								messageSuccess.style.opacity = "0";
								messageSuccess.style.visibility = "hidden";
								messageSuccess.classList.remove('transitionClean');
							}
					})
			});
		});
	}


	//-------------------- Servidor -----------------

	if(value == 1){
		elements.forEach(element => {
			element.addEventListener('click', (e) => {
				let id = e.target.id,
					alert = document.getElementById('add_alert');


				apiCart.addToCart(id)
					.then(res => {
						if(res.status == 200){
							callingCart();
							carrito.addingAlert(alert)
						}
					})
			});
		});
	}
}

	//-------------- VERIFICAR PRODUCTO --------
function verifyProduct(producto){
	let variable;
	let encontrado = '';
	if(productos.length > 0){

		productos.forEach(element => {
			if(element.id == producto.id){
				element.cantidad += producto.cantidad;
				variable = false;
				encontrado = 'encontrado';
			}
		});

		if(encontrado.length == 0){
			variable = true;
		}

	}else{
		variable = true;
	}

	return variable;
}

//-------------------- Agregar Storage Al servidor -----------------

function addingStorageToServer(storage){
	if(storage.length > 0)
	{
		axios.post('/cart/storage', {
			products: storage,
		})
		.then(res => {
			if(res.status == 200){
				localStorage.clear();
				callingCart();
			}
		})
	}else{
		callingCart();
	}
}


//-------------------- Llamar carrito de productos -----------------

function callingCart(){
	apiCart.getCart()
		.then(res => {
			productos = res.data;
			carrito.agregarCarrito(productos);
			loadProducts(productos);
			loadTotalProducts(productos, 1)
		})
}


function loadTotalProducts(elements,value){
	if(total_container){
		carrito.totalCart(elements, total_container, value)
	}
}


// ------------- FUNCION PARA OBTENER PRECIO SIN SOMBOLO -----------------

function onlyPrice(price){
	let test = price.split("$")
	return parseFloat(test[1].trim())
}

// ------------- FUNCION PARA VACIAR EL CARRITO -----------------
function vaciarCarrito(){
	productos = []
	storage.addStorage(productos)
		.then(res => {
			carrito.agregarCarrito(productos);
		})
}

// ------------- FUNCION PARA AUMENTAR CANTIDAD -----------------
function carritoCantidad(e) {
	const cantidad = parseInt(e.value),
		  id = parseInt(e.id);

	if(actualizarCantidad({cantidad, id})){
		storage.addStorage(productos)
			.then(res => {
				carrito.agregarCarrito(productos);
			})
	}
}

// ------------- FUNCION PARA ACTUALIZAR CANTIDAD EN EL LOCAL STORAGE -----------------
function actualizarCantidad(producto) {

	let variable = false

	if(productos.length > 0){
		productos.forEach(element => {
			if(element.id == producto.id){
				element.cantidad = producto.cantidad;
				variable = true;
			}
		});

	}

	return variable
}

// ------------- FUNCION PARA ELIMINAR PRODUCTO DEL CARRITO -----------------

function eliminarDelCarrito(id){

	productos = destroyProduct(productos, id)

	storage.addStorage(productos)
		.then(res => {
			carrito.agregarCarrito(productos);
		})
}


function destroyProduct(productos, id) {
	return productos.filter(producto => {
		return producto.id !== id
	})
}

// ------------- FUNCION PARA VERIFICAR CANTIDAD DEL PRODUCTO -----------------

async function verificarCantidadProducto(id, element){

	let producto = productos.find(producto => producto.id == id)

	let template = ``,
		count = 1,
		productQuantity = await callProduct(id);


	while( count <= productQuantity){
		template += `
			<option class="cantidad_opcion" value="${count}" ${producto.cantidad == count ? 'selected' : ''}>${count}</option>
		`

		if(count === 10){
			break
		}

		count = count + 1 ;
	}

	element.innerHTML = template
}

async function callProduct(id) {
	return axios.get(`/cantidad-producto/${id}`)
		.then(res => {
			return res.data
		})
}

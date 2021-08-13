
<div class="col-12 col-sm-6 col-lg-4 px-2 mb-4 pb-0">
    <div class="card shadow-md" style="border: 0px;">
        <div class="card_product">
            <a href="{{route('producto.show', $producto->slug)}}" itemprop="url">
                <img class="img_product" src="{{asset('storage/'. $producto->image)}}" alt="{{$producto->title}}" itemprop="image">
            </a>
        </div>
        <div class="card-body" style="padding: 0.6rem 0.8rem 0 0.8rem;">
            <div class="row px-3">
                <div class="col-12 px-0 mt-0 pt-0">
                    <a class="text_categorie_card" href="{{route('product.category.show', $producto->category->slug)}}" > <span itemprop="category">{{$producto->category->title}}</span> </a>
                </div>
                <div class="col-12 px-0">
                    <a class="text_title_card_product" href="{{route('producto.show', $producto->slug)}}" itemprop="url"> <span itemprop="name">{{$producto->title}}</span> </a>
                </div>
                <div class="col-12 px-0 mb-2" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                    <span class="price_card_product"><span itemprop="priceCurrency" content="USD">$</span> <span itemprop="price" content="{{number_format($producto->price, 2)}}">{{number_format($producto->price, 2)}}</span> </span>
                    <span class="referencial_price_card_product pl-2">${{number_format($producto->price_reference, 2)}}</span>
                </div>
            </div>
            <div class="row px-3">
                @if($producto->quantity >= 10)
                    <select class="form-control mb-1" id="quantity_product_{{$producto->id}}">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                @elseif($producto->quantity > 0)
                    @php $contador = 1 @endphp
                    <select class="form-control mb-1"  id="quantity_product_{{$producto->id}}">
                        @while($contador <= $producto->quantity)
                            <option value="{{$contador}}">{{$contador}}</option>
                            @php $contador += 1 @endphp
                        @endwhile
                    </select>
                @endif

                @if($producto->quantity > 0)
                    <button id="{{$producto->id}}" class="col-12 btn btn-secondary-product text-rubik text-white addProduct">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="16px" height="16px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                            Agregar al carrito
                    </button>
                @else
                    <button class="col-12 btn btn-secondary text-rubik">Agotado</button>
                @endif
            </div>
            <input type="text" value="{{$producto->slug}}" style="visibility: hidden; height:0; margin: 0; padding: 0;">
        </div>
    </div>
  </div>

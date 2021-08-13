<section class="container-fluid my-4 px-2 px-md-4">
    <div class="mb-2">
        <h2 class="text-rubik color-primary text-lg font-semibold mb-0">Disfruta de las mejores promociones</h2>
        <p class="text-rubik">Conoce lo que traemos para tí</p>
    </div>
    <div class="owl-carousel owl-theme" id="destacados_banners">
        @foreach($publicidades as $publicidad)
        {{-- <div class="bg-no-repeat bg-cover bg-center w-full h-24 md:h-32 xl:h-36 overflow-hidden"></div> --}}
            <a href="{{$publicidad->link}}" aria-label="ir a promocion de suministros medicos en Venezuela">
                <div class="item img_container_others_banner shadow-md rounded-md" style="background-image: url('{{asset('storage/'.$publicidad->image)}}');">
                    {{-- <img class="img_others_banner" src=""> --}}
                </div>
            </a>
        @endforeach
    </div>
</section>
<script>
    $('#destacados_banners').owlCarousel({
        loop: true,
        margin: 10,
        mouseDrag: true,
        nav: false,
        dots: false,
        navText: ['<img src="{{asset('flecha.svg')}}" style="width: 25px;"/>', '<img src="{{asset('flecha.svg')}}" style="width: 25px; transform: rotate(-180deg);"/>'],
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            }
        }
    })
</script>

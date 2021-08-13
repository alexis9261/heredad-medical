@if(isset($navbar_null))

@else
    <footer>
        <div class="container py-2 mt-5">
            <div class="row justify-content-center">
                <div class="col-12 col-md-5 col-lg-4 footer_nav my-md-4 order-2 order-md-1">
                    <ul class="nav nav-sm nav-white nav-x-sm align-items-center">
                        <li class="nav-item">
                          {{-- <a class="nav-link primer_enlace" href="https://www.instagram.com/construganga/" target="_blank">Instagram</a> --}}
                          <a class="nav-link" href="" target="_blank">Instagram</a>
                        </li>
                        <li class="nav-item opacity">/</li>
                        <li class="nav-item">
                          {{-- <a class="nav-link" href="https://www.facebook.com/construganga.valencia.7" target="_blank">Facebook</a> --}}
                          <a class="nav-link" href="" target="_blank">Facebook</a>
                        </li>
                    </ul>
                </div>
                <div class="col-12 col-md-2 col-lg-4 py-2 text-center order-1 order-md-2">
                    @if(isset($logo))
                        <img src="{{asset('storage/'.$logo->image)}}" style="width: 70px; height: 70px;" alt="LOGO">
                    @else
                        <img src="" style="width: 70px; height: 70px;" alt="LOGO">
                    @endif
                    <div class="row justify-content-center">
                        <p class="text-white">
                            {{-- Zona ind. Norte, av este oeste c/c norte sur, parcela 278 A. Valencia edo Carabobo --}}
                            San Diego - Carabobo, Venezuela <br>
                            Calle ppal. de Colinas <br>
                            Referencia: Bajar por Clínica Los Jarales, a 2 cuadras de la Panadería Michell Pan, local de la esquina <br>
                            Horario: Lunes-Sábado 9am - 7pm

                        </p>
                        {{-- <div class="text-white mt-1">
                            +58 424 421 44 74
                        </div>
                        <div class="col-12 text-white mt-1">
                            +58 424 421 13 08
                        </div> --}}
                    </div>
                </div>
                <div class="col-12 col-md-5 col-lg-auto ml-auto footer_nav my-md-4 order-3">
                    <ul class="nav nav-sm nav-white nav-x-sm align-items-center">
                        <li class="nav-item">
                          <a class="nav-link primer_enlace" href="/">Home</a>
                        </li>
                        <li class="nav-item opacity">/</li>
                        <li class="nav-item">
                          <a class="nav-link" href="{{route('productos')}}">Vitrina de productos</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-12 text-center py-3 copyring-container">
                    {{-- <p class="my-3">Construganga VLN CA. Todos los derechos reservados @php echo date('Y'); @endphp </p> --}}
                    <p class="my-3">Alpargata Skate C.A. Rif. J-40585208-9 Todos los derechos reservados @php echo date('Y'); @endphp </p>
                    <small> © Sitio desarrollado por <a href="https://oxas.tech/" target="_blank">oxas.tech</a></small>
                </div>
            </div>
        </div>
@endif

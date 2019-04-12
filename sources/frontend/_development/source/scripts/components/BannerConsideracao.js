import Banner from "./Banner";

class BannerConsideracao extends Banner{

    constructor( $holder ){
        super();
        this.holder = $holder;
    }

    setupTemplate(){

        var htmlCode = `
            <div class="banner-item banner-consideracao">

                <div class="banner-item__inner">

                    <div class="banner-content-left">

                        <div class="promo-wrap">

                            <div class="promo-content-first">
                                <div class="promo-text">
                                    <span>Preço fixo e a</span>
                                    <span>maior cobertura</span>
                                    <span>de internet móvel</span>
                                    <span>do Brasil</span>
                                </div>

                                <a class="btn btn-banner only-desktop">
                                    ASSINE JÁ
                                </a>
            
                                <div class="banner-bottom-text only-desktop">
                                    CONTRATE POR TELEFONE
                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="banner-content-right">

                        <div class="promo-content-first">
                            <div class="promo-icons-wrap">
                                <img src="img/novo/icons/icon-whatsapp.png">
                                <img src="img/novo/icons/icon-ligacoes.png">
                            </div>
                            <div class="promo-text">
                                <span>whatsapp e ligações</span>
                                <span>ilimitadas</span>
                            </div>
                        </div>

                        <div class="promo-content-conector">
                            <img src="img/novo/icon-plus-secondary.png">
                        </div>

                        <div class="promo-content-second">
                            <div class="promo-icons-wrap">
                                <img src="img/novo/icons/icon-youtube.png">
                                <img src="img/novo/icons/icon-netflix.png">
                                <img src="img/novo/icons/icon-spotify.png">
                                <span>
                                    E MUITO<br>MAIS
                                </span>
                            </div>
                            <div class="promo-text">
                                <span>Gigas exclusivos</span>
                                <span>para usar com os apps</span>
                                <span>por 6 meses</span>
                            </div>
                        </div>
                    </div>

                    <div class="promo-action only-mobile">
                        <a class="btn btn-banner">
                            ASSINE JÁ
                        </a>

                        <div class="banner-bottom-text">
                            CONTRATE <br class="only-mobile">POR TELEFONE
                        </div>
                    </div>

                </div>
            </div>
        `;
        // bg
        this.templateHTML = $( htmlCode );
        this.holder.html( this.templateHTML );

        this.addListeners();
    }

}

export default BannerConsideracao;
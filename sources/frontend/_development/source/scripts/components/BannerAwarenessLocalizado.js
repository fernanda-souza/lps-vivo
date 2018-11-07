import Banner from "./Banner";

class BannerAwarenessLocalizado extends Banner{

    constructor( $holder ){
        super();
        this.holder = $holder;
    }

    setupTemplate(){

        var htmlCode = `
        <div class="banner-item banner-awareness-localizado">

            <div class="banner-item__inner">

                <div class="banner-first-block">
                    <span>Preço fixo e a maior</span>
                    <span>cobertura de internet</span>
                    <span>móvel do Brasil</span>
                </div>

                <div class="promo-content-conector only-desktop">
                    <img class="only-desktop" src="img/novo/icon-plus-roxo-big.png">
                    <img class="only-mobile" src="img/novo/icon-plus-roxo-big.png">
                </div>

                <div class="banner-second-block">
                    <div class="promo-content-conector only-mobile">
                        <img class="only-desktop" src="img/novo/icon-plus-roxo-big.png">
                        <img class="only-mobile" src="img/novo/icon-plus-roxo-big.png">
                    </div>
                    <div class="promo-text-consideracao2">
                        <span>Seu plano</span>
                        <span>Sem fidelidade</span>
                    </div>
                </div>
                <div class="banner-third-block">
                    <a class="btn btn-banner-consideracao2" data-action="anchor" data-target="planos" data-analytics-id="click-cta" data-analytics-product-name="planos" data-analytics-position="destaque" data-analytics-sku="undefined" data-analytics-label="ver-planos">
                        VER PLANOS
                    </a>
                    <div class="banner-bottom-text">
                        OU LIGUE <br/>
                        0800 10 1515
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

export default BannerAwarenessLocalizado;
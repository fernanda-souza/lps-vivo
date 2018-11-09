import Banner from "./Banner";

class BannerAwareness extends Banner{

    constructor( $holder ){
        super();
        this.holder = $holder;
    }

    setupTemplate(){
        var htmlCode = `
            <div class="banner-item banner-awareness-localizado2">

            <div class="banner-item__inner">
                <div class="banner-first-block">
                    <span>Seu plano sem fidelidade </span>
                    <span>na maior cobertura de</span>
                    <span>internet móvel do Brasil.</span>                  
                </div>

                <div class="banner-third-block">
                    <a class="btn btn-banner-consideracao2" data-action="anchor" data-target="planos" data-analytics-id="click-cta" data-analytics-product-name="planos" data-analytics-position="destaque" data-analytics-sku="undefined" data-analytics-label="ver-planos">
                        VER PLANOS
                    </a>
                    <div class="banner-bottom-text">
                        OU LIGUE <br class="only-mobile" />
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

export default BannerAwareness;
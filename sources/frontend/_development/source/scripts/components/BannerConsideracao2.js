import Banner from "./Banner";

class BannerConsideracao extends Banner{

    constructor( $holder ){
        super();
        this.holder = $holder;
    }

    setupTemplate(){

        var htmlCode = `
        
        <div class="banner-item banner-consideracao3">

            <div class="banner-item__inner">

                <div class="banner-first-block">
                    <span>PREÇO FiXO E A MAiOR</span>
                    <span>COBERTURADE iNTERNET</span>
                    <span>MÓVEL DO BRASiL</span>
                </div>

                <div class="banner-second-block">
                    <div class="promo-icons-wrap">
                        <img src="img/novo/icons/logo_whatsapp_2.png">
                        <img src="img/novo/icons/icon-ligacoes-big.png">
                    </div>
                    <div class="promo-text-consideracao2 only-desktop">
                        <span>whatsapp e ligações</span>
                        <span>ilimitadas</span>
                    </div>
                    <div class="promo-text-consideracao2 only-mobile">
                        <span>whatsapp e ligações</span>
                        <span>ilimitadas</span>
                    </div>
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

export default BannerConsideracao;
import Banner from "./Banner";
import Helpers from "../services/Helpers";

class BannerGiga extends Banner {
    constructor($holder) {
        super();
        this.holder = $holder;
        this.helper = new Helpers();
    }

    setupTemplate() {
        var htmlCode = `
        <div class="banner-item banner-conversao4">

            <div class="banner-item__inner">
                
                <div class="banner-first-block">
                    <img src="img/logo.png" alt="Logo Vivo Controle" class="logo">
                </div>
                <div class="banner-internet">
                    <h2>4,5GB</h2>
                    <h3 class="only-desk">
                        de 
                        <br>
                        internet
                    </h3>
                    <h3 class="only-mobile">de internet</h3>
                </div>

                <div class="only-mobile">
                    <div class="banner-separator">
                        <img src="img/separator.png">
                        <div class="separator"></div>
                    </div>
                    <div class="banner-first-block">
                        <h2 class="banner-promo-title">Apps ilimitados para você curtir muito.</h2>
                        <div class="promo-icons-wrap2">
                            <img src="img/groups-icons_apps.png">
                        </div>
                    </div>
                    <div class="banner-separator">
                        <img src="img/separator.png">
                        <div class="separator"></div>
                    </div>
                    <div class="banner-first-block">
                        <h2 class="banner-promo-title">Ligações ilimitadas.</h2>
                    </div>
                </div>

                <span class="apenas">Por apenas</span>
                <div class="banner-price">
                    <div class="banner-price-rs">R$</div>
                    <div class="banner-price-value"> </div>
                    <div class="banner-price-cents">,99</div>
                    <div class="banner-price-month">/mês</div>
                    <div class="banner-price-anual">Plano anual</div>
                </div>
                <div class="banner-assine">
                    <a href="#" data-target="link-banner-assine-ja">Assine já</a>
                    <p>Ou ligue <a href="tel:0800 10 1515">0800 10 1515</a></p>
                </div>
            </div>

            <div class="banner-item__inner left only-desk">
                <div class="banner-separator">
                    <img src="img/separator.png">
                    <div class="separator"></div>
                </div>
                <div class="banner-first-block">
                    <h2 class="banner-promo-title">Apps ilimitados <br> para você <br> curtir muito.</h2>
                    <div class="promo-icons-wrap">
                        <img src="img/groups-icons_apps.png">
                    </div>
                </div>
                <div class="banner-separator">
                    <img src="img/separator.png">
                    <div class="separator"></div>
                </div>
                <div class="banner-first-block">
                    <h2 class="banner-promo-title">Ligações <br> ilimitadas para <br> todo o Brasil.</h2>
                </div>
                `;
        if (this.helper.isMobile()) {
            htmlCode += `<div class="banner-bottom-text hide--mobile">
                                        
                                   </div>`;
        } else {
            htmlCode += `<div class="banner-bottom-text hide--desk">
                                
                                   </div>`;
        }

        htmlCode += `</div>

                </div>
            </div>
        </div>
        `;
        // bg
        this.templateHTML = $(htmlCode);
        this.holder.html(this.templateHTML);
    }
}

export default BannerGiga;

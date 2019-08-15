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
            <div class="banner-column__one">
                <div class="banner-internet">
                    <h2>4,5GB</h2>
                    <h3 class="only-desk">de <br>internet</h3>
                    <h3 class="only-mobile">de internet</h3>
                </div>
                <img class="only-mobile" src="img/separator-mobile.png">
                <div class="banner-price only-desk">
                    <div class="banner-price-rs">R$</div>
                    <div class="banner-price-value"> </div>
                    <div class="banner-price-cents">,99</div>
                    <div class="banner-price-month">/mês</div>
                    <div class="banner-price-anual">Plano anual</div>
                </div>
                <div class="banner-assine only-desk">
                    <a href="#" data-target="link-banner-assine-ja">Assine já</a>
                    <p>Ou ligue <a href="tel:0800 10 1515">0800 10 1515</a></p>
                </div>
            </div>
            <img class="only-desk"src="img/separator.png" />
            <div class="banner-column__two">
                <h2 class="banner-promo-title">Apps<br>ilimitados</h2>
                <div class="promo-icons-wrap">
                    <img src="img/groups-icons_apps.png">
                </div>
            </div>
            <img class="only-mobile" src="img/separator-mobile.png">
            <img class="only-desk" src="img/separator.png" />
            <div class="banner-column__three">
                <div class="banner-first-block">
                    <h2 class="banner-promo-title only-desk">Ligações<br>ilimitadas<br>para todo o<br>Brasil.</h2>
                    <h2 class="banner-promo-title only-mobile">Ligações ilimitadas<br>para todo o Brasil.</h2>
                </div>
                <div class="banner-first-block">
                    <img src="img/logo-v2.png" alt="Logo Vivo Controle" class="logo only-desk">
                </div>
                <div class="banner-price only-mobile">
                    <div class="banner-price-rs">R$</div>
                    <div class="banner-price-value"> </div>
                    <div class="banner-price-cents">,99</div>
                    <div class="banner-price-month">/mês</div>
                    <div class="banner-price-anual">Plano anual</div>
                </div>
                <div class="banner-first-block logo-container only-mobile">
                    <img src="img/logo-v2.png" alt="Logo Vivo Controle" class="logo">
                </div>
                <div class="banner-assine only-mobile">
                    <a href="#" data-target="link-banner-assine-ja">Assine já</a>
                    <p>Ou ligue <a href="tel:0800 10 1515">0800 10 1515</a></p>
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

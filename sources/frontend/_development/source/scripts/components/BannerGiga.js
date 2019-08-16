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
                    <p class="franquia">4,5GB</p>
                    <p class="franquia-texto only-desk">de <br>internet</p>
                    <p class="franquia-texto only-mobile">de internet</p>
                </div>
                <picture>
                    <source type="image/webp" srcset="img/webp/separator-mobile.webp">
                    <source type="image/png" srcset="img/separator-mobile.png">
                    <img class="only-mobile" src="img/separator-mobile.png">
                </picture>                
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
            <picture>
                <source type="image/webp" srcset="img/webp/separator.webp">
                <source type="image/png" srcset="img/separator.png">
                <img class="only-desk" src="img/separator.png" />
            </picture>
            <div class="banner-column__two">
                <p class="banner-promo-title">Apps<br>ilimitados</p>
                <div class="promo-icons-wrap">
                    <img src="img/groups-icons_apps.png">
                </div>
            </div>
            <picture>
                <source media="(max-width:767px;)" type="image/webp" srcset="img/webp/separator-mobile.webp">
                <source media="(max-width:767px;)" type="image/png" srcset="img/separator-mobile.png">
                <img class="only-mobile" src="img/separator-mobile.png">

                <source type="image/webp" srcset="img/webp/separator.webp">
                <source type="image/png" srcset="img/separator.png">
                <img class="only-desk" src="img/separator.png" />
            </picture>
            <div class="banner-column__three">
                <div class="banner-first-block">
                    <p class="banner-promo-title only-desk">Ligações<br>ilimitadas<br>para todo o<br>Brasil.</p>
                    <p class="banner-promo-title only-mobile">Ligações ilimitadas<br>para todo o Brasil.</p>
                </div>
                <div class="banner-first-block">
                    <picture>
                        <source type="image/webp" srcset="img/webp/logo-v2.webp">
                        <source type="image/png" srcset="img/logo-v2.png">
                        <img src="img/logo-v2.png" alt="Logo Vivo Controle" class="logo only-desk">
                    </picture>
                </div>
                <div class="banner-price only-mobile">
                    <div class="banner-price-rs">R$</div>
                    <div class="banner-price-value"> </div>
                    <div class="banner-price-cents">,99</div>
                    <div class="banner-price-month">/mês</div>
                    <div class="banner-price-anual">Plano anual</div>
                </div>
                <div class="banner-first-block logo-container only-mobile">
                    <picture>
                        <source type="image/webp" srcset="img/webp/logo-v2.webp">
                        <source type="image/png" srcset="img/logo-v2.png">
                        <img src="img/logo-v2.png" alt="Logo Vivo Controle" class="logo">
                    </picture>
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

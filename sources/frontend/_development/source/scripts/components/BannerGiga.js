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
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                </div>
                <h2>Preço fixo e a <strong>maior cobertura</strong><br />de internet móvel do Brasil.</h2>
            </div>

            <div class="banner-item__inner left">

                <div class="banner-first-block">
                    <div class="promo-icons-wrap">
                        <img src="img/groups-icons_apps.png">
                    </div>
                    <div class="promo-text-consideracao2">
                        <span>APPS</span>
                        <span>ILIMITADOS</span>
                    </div>
                </div>
                <div class="banner-second-block">
                    <div class="preco-container">
                        <span class="partir">A partir</span>
                        <div class="preco">
                            <span class="preco">de <span>R$</span></span>
                            <span class="preco preco-regional"></span>
                            <span class="subprice">,99</span>
                            <span> <span style="font-family:Arial;">/</span>mês </span>
                        </div>
                        <p data-target="franquia">No <strong>Plano Controle <span class="internet-gb"></span></strong></p>
                    </div>

                    <div class="banner-third-block">
                        <a class="btn btn-banner-consideracao2" data-target="link-banner-assine-ja">
                          ASSINE JÁ
                        </a>
                        `;
        if (this.helper.isMobile()) {
            htmlCode += `<div class="banner-bottom-text hide--mobile">
                                        <a style="color:#fff;text-decoration:none;" href="tel:+0800101515" data-analytics-id="click-cta" data-analytics-label="c2c">Ou ligue 0800 10 1515</a>
                                   </div>`;
        } else {
            htmlCode += `<div class="banner-bottom-text hide--desk">
                                <a href="tel:0800101515" data-analytics-id="click-cta" data-analytics-label="c2c">Ou ligue 0800 10 1515</a>
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

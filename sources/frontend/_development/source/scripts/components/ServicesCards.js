import Helpers from "../services/Helpers";

class ServicesCards {
    constructor() {
        this.comp_0005_cards_digitalserv();
        this.initCarouselCombos();
    }

    comp_0005_cards_digitalserv() {
        var svaGuru = $(".swiper-wrapper .card:nth-child(2)");

        var regions = require('../fill/regions.js').regions;
        var helpers = new Helpers();

        if (jQuery.inArray(parseInt(helpers.getCookie('controle_ddd')), regions.ne) != -1) {
            svaGuru.css('display', 'none');
        } else {
            svaGuru.css('display', 'block');
        }

        $('.swiper-pagination a').click(function() {
            event.preventDefault();
        });
    }

    initCarouselCombos() {

        new Swiper('.cards_content .swiper-container', {
            slidesPerView: $(window).width() >= 768 ? 3 : 1,
            spaceBetween: 30,
            slidesPerGroup: $(window).width() >= 768 ? 3 : 1,

            pagination: {
                el: '.swiper-container .swiper-pagination',
                clickable: true,
                renderBullet: function(index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                }
            },

            navigation: {
                nextEl: '.button-next-combo',
                prevEl: '.button-prev-combo',
            }
        });
    }
}

export default ServicesCards;
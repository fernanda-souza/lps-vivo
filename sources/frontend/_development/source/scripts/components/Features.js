import Helpers from "../services/Helpers";
import DataLayer from "../services/DataLayer";

class Features {
    constructor() { 
        this.helpers = new Helpers();
        this.datalayer = new DataLayer();
        this.comp_0004_box_services();
        this.getWindowSize();
    }

    comp_0004_box_services() {
        $(".comp_0004_box_services .box_nav li").click(function() {
            var datalayer = new DataLayer();
            var helpers = new Helpers();

            $(".box_nav li").removeClass("active");
    
            var thumb_select = $(this).data('choose');

            $(".box_item[data-main-content]").hide();
            $(".box_item[data-main-content=" + thumb_select + "]").fadeIn("slow").focus();
            $(this).addClass("active");

            var getcookie_cidade = decodeURI(helpers.getCookie('controle_cidade'));
            var getcookie_ddd = helpers.getCookie('controle_ddd');
            var getcookie_estado = helpers.getCookie('controle_estado');
            datalayer.sendDataLayerGeneric('gauge.vantagens--exibiu', getcookie_estado, getcookie_cidade, getcookie_ddd);
        });
    }

    getWindowSize() {
        var w = $(window).width();
    
        if (w < 768) {
            $(".services_box").addClass("isMobile");
    
        } else {
            $(".services_box").removeClass("isMobile");
        }
    
        this.slickInit();
    }

    slickInit() {
        $('.isMobile .box_container').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            arrows: false
        });
    }
}

export default Features;
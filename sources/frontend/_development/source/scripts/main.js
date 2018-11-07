import $ from "jquery";
import MobileNav from "./components/MobileNavbar";
import Header from "./components/Header";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Compass from "./components/Compass";
import ServicesCards from "./components/ServicesCards";
import ModalVivi from "./components/ModalVivi";
// import ControlParameter from "./components/ControlParameter";
import Helpers from './services/Helpers';
import BussolaInput from './components/bussolaInput';
import Gigas from './components/Gigas';
import Planos from './components/Planos';
import Aplicativos from './components/Aplicativos';
import MenuMobile from './components/MenuMobile';
import QueryStringHandler from './components/QueryStringHandler';

import DataLayer from "./services/DataLayer";


var helpers = new Helpers();
window.regionalizationFirstTime = true;
require('./services/ddds');
require("./services/drag");

class Main {

    /**
     * Get Variables from URL.
     */
    getQueryVariable(variable) {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }

    /**
     * Defines the location where the "bussola_onpage" will be created.
     */
    insertBussola() {
        let local = this.getQueryVariable('compass-position');
        let html = "<div class='bussola_onpage'></div>";

        switch(local) {
            case 'top': $('#bussola-placeholder-top').html(html); break;
            case 'bottom': $('#bussola-placeholder-bottom').html(html);  break;
            default: $('#bussola-placeholder-top').html(html);  break;
        }

        new Compass();

        this.bussolaInput = new BussolaInput();
    }

    constructor() {
        new MobileNav();
        new Header();
        new Features();
        new FAQ();
        new ServicesCards();
        new ModalVivi();
        // new Gigas();
        new Aplicativos();
        // new Planos();
        new MenuMobile();
        let querystring  = new QueryStringHandler();
        querystring.parseURLParam();
        this.insertBussola();

        //dataLayer page-init
        this.datalayer = new DataLayer();
        this.datalayer.sendDataLayerInit(
            'page-init',
            ( this.bussolaInput.getcookie_estado ? this.bussolaInput.getcookie_estado.toLowerCase() : undefined),
            ( this.bussolaInput.getcookie_cidade ? helpers.stringSanitize( this.bussolaInput.getcookie_cidade ) : undefined),
            ( this.bussolaInput.getcookie_ddd ? this.bussolaInput.getcookie_ddd : undefined),
            ( helpers.getUrlParameter( 'id_origem_vivo' ) ? helpers.getUrlParameter( 'id_origem_vivo' ) : undefined )
        );

        $('[data-target="link-banner-assine-ja"]').click(function(){
            if($(this).attr('href') == undefined)
                $('html, body').animate({
                    scrollTop: $("#planos").offset().top - $("#header").height() + ( ($(window).width() > 768) ? 100 : 0 )
                }, 200, 'linear');
                $("#autocomplete").click();
                $("#autocomplete").focus();
        })
    }
}

$(window).on('load', function () {
    if (helpers.isDesktop()) {
        $('#btnbackbuss').attr('id', 'btn_cidade');
    } else {
        // $('#autocomplete_input').attr('id', 'autocomplete');
    }
    
    new Main();
})

// window.enableMobileChat = function() {
//     if ($(window).width() < 768) {
//         setTimeout(function() {
//             //$('#livechat-compact-container').show()
//         }, 10000)
//     }
// }

let openModal = $(".btnnull");
//openModal.show();
openModal.click(function (e) {
    e.preventDefault();
    $("#modalChatvivi").fadeIn();
});

let closeModal = $(".btn-fechar");
closeModal.click(function (e) {
    e.preventDefault();
    $("#modalChatvivi, #modalChatdireto").fadeOut();
});

let openChat = $("#box-btn_right");
openChat.click(function (e) {
    e.preventDefault();
    $("#modalChatvivi").fadeOut("slow");
    $("#web").trigger("click");
});

function closeModal() {
    let closeModal = $(".btn-fechar");
    closeModal.click(function (e) {
        e.preventDefault();
    });
}

let openChatLeft = $("#box-btn_left");
openChatLeft.click(function (e) {
    e.preventDefault();
    console.log("teste");
    $("#modalChatvivi").fadeOut("slow");
    $("#modalChatdireto").fadeIn("slow");
});

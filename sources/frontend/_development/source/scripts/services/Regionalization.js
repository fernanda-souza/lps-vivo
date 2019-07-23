"use strict";

import Planos from "../components/Planos";
import QueryStringHandler from "../components/QueryStringHandler";

var isArray =
    Function.isArray ||
    function(o) {
        return typeof o === "object" && Object.prototype.toString.call(o).slice(8, -1) === "Array";
    };

var Plan = (function() {
    Plan = function Plan(data) {
        for (var key in data) {
            if (!data.hasOwnProperty(key)) continue;

            this[key] = data[key];
        }
    };

    Plan.prototype.toJSON = function() {
        var o = {};

        for (key in this) {
            if (!this.hasOwnProperty(key)) continue;
            o[key] = this[key];
        }

        return o;
    };

    Plan.prototype.getPriceFull = function() {
        return this.price.amount;
    };

    Plan.prototype.getPrice = function() {
        var calcPrice = Math.round((this.price.amount - this.price.discount) * 100) / 100;
        return calcPrice.toFixed(2);
    };

    return Plan;
})();

var Documento = (function() {
    Documento = function Documento(data) {
        var keys = ["region", "nome", "link"];

        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            if (!data.hasOwnProperty(key)) continue;

            this[key] = data[key];
        }
    };

    return Documento;
})();

var Banner = (function() {
    Banner = function Banner(data) {
        var keys = ["region", "franquia", "minutos", "valor"];

        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            if (!data.hasOwnProperty(key)) continue;

            this[key] = data[key];
        }
    };

    return Banner;
})();

var RegionItems = (function() {
    var _addItem = function(region, item, items) {
        if (!isArray(region) && typeof region !== "string" && typeof region !== "number") {
            throw new TypeError("region must be a string, number or array");
        } else if (isArray(region)) {
            for (var j = 0, len = region.length; j < len; j++) {
                _addItem(region[j], item, items);
            }
        } else {
            if (!items.hasOwnProperty(region)) {
                items[region] = [];
            }

            items[region].push(item);
        }
    };

    RegionItems = function RegionItems(items) {
        this._region_items = {};

        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];

            if (!item.hasOwnProperty("region")) throw new TypeError("missing error property");

            var region = item.region;

            _addItem(region, item, this._region_items);
        }

        var regexInt = /(^\d+)/;

        for (var key in this._region_items) {
            if (!this._region_items.hasOwnProperty(key)) continue;
            if (!isArray(this._region_items[key])) continue;
            this._region_items[key].sort(function(a, b) {
                if (!("internet" in a || "internet" in b)) return 0;
                var quantiaA = a.internet.match(regexInt);
                var quantiaB = b.internet.match(regexInt);

                if (!(quantiaA || quantiaB)) return 0;
                quantiaA = +quantiaA;
                quantiaB = +quantiaB;
                if (quantiaA < quantiaB) return -1;
                else if (quantiaA > quantiaB) return 1;
                return 0;
            });
        }
    };

    RegionItems.prototype.get = function(key) {
        return this._region_items[key];
    };

    RegionItems.prototype.toJSON = function() {
        return this._region_items;
    };

    return RegionItems;
})();

var regions = require("../fill/regions.js").regions;

var plansControle = [
    // nacional
    new Plan({
        region: regions.nacional,
        internet: "4,5GB",
        TJinternet: "4GB + 500MB de bônus*",
        mainoffer: true,
        appname: "vivocontrolenba",
        SKU: ["VC00031", "VIVOCTRLF45N"],
        hideapps: false,
        appsText: "GoRead, Vivo Cloud Sync e NBA",
        appsTextnaofiel: "GoRead, Vivo Cloud Sync",
        appsimg: "group-apps",
        fidelizado: true,
        price: {
            amount: 54.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.nacional,
        internet: "5,5GB",
        TJinternet: "5GB + 500MB de bônus*",
        mainoffer: true,
        appname: "vivocontrolekantoo",
        SKU: ["VC00030", "VIVOCTRLF46N"],
        hideapps: false,
        appsText: "GoRead, Vivo Cloud Sync, NBA e Kantoo Inglês",
        appsTextnaofiel: "GoRead, Vivo Cloud Sync, NBA",
        appsimg: "group-apps",
        fidelizado: true,
        price: {
            amount: 69.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.nacional,
        internet: "4GB",
        TJinternet: "3,5GB + 500MB de bônus*",
        mainoffer: true,
        appname: "vivocontrolenba",
        SKU: ["VC00031", "VIVOCTRLF49N"],
        hideapps: false,
        appsText: "GoRead, Vivo Cloud Sync",
        appsTextnaofiel: "GoRead, Vivo Cloud Sync",
        appsimg: "group-apps",
        fidelizado: false,
        price: {
            amount: 54.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.nacional,
        internet: "4,5GB",
        TJinternet: "4GB + 500MB de bônus*",
        mainoffer: true,
        appname: "vivocontrolekantoo",
        SKU: ["VC00030", "VIVOCTRLF50N"],
        hideapps: false,
        appsText: "GoRead, Vivo Cloud Sync, NBA",
        appsTextnaofiel: "GoRead, Vivo Cloud Sync, NBA",
        appsimg: "group-apps",
        fidelizado: false,
        price: {
            amount: 69.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.nacional,
        internet: "5,5GB",
        TJinternet: "5GB + 500MB de bônus*",
        mainoffer: true,
        appname: "vivocontrolekantoo",
        SKU: ["VC00030", "VIVOCTRLF51N"],
        hideapps: false,
        appsText: "GoRead, Vivo Cloud Sync, NBA e Kantoo Inglês",
        appsimg: "group-apps",
        fidelizado: false,
        price: {
            amount: 84.99,
            discount: 0,
            perLine: 0
        }
    }),

    new Plan({
        region: regions.especiais,
        internet: "4,5GB",
        TJinternet: "4GB + 500MB de bônus*",
        mainoffer: true,
        appname: "vivocontrolenba",
        SKU: ["VC00031", "VIVOCTRLF53N"],
        hideapps: true,
        appsText: "GoRead, Vivo Cloud Sync e NBA",
        appsimg: "group-apps-semwhats",
        fidelizado: true,
        price: {
            amount: 52.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.especiais,
        internet: "5,5GB",
        TJinternet: "5GB + 500MB de bônus*",
        mainoffer: true,
        appname: "vivocontrolekantoo",
        SKU: ["VC00030", "VIVOCTRLF54N"],
        hideapps: true,
        appsText: "GoRead, Vivo Cloud Sync, NBA e Kantoo Inglês",
        appsimg: "group-apps-semwhats",
        fidelizado: true,
        price: {
            amount: 67.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.especiais,
        internet: "4GB",
        TJinternet: "3,5GB + 500MB de bônus*",
        mainoffer: true,
        appname: "vivocontrolenba",
        SKU: ["VC00031", "VIVOCTRLF57N"],
        hideapps: true,
        appsText: "GoRead, Vivo Cloud Sync e NBA",
        appsimg: "group-apps-semwhats",
        fidelizado: false,
        price: {
            amount: 52.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.especiais,
        internet: "4,5GB",
        TJinternet: "4GB + 500MB de bônus*",
        mainoffer: true,
        appname: "vivocontrolekantoo",
        SKU: ["VC00030", "VIVOCTRLF58N"],
        hideapps: true,
        appsText: "GoRead, Vivo Cloud Sync, NBA e Kantoo Inglês",
        appsimg: "group-apps-semwhats",
        fidelizado: false,
        price: {
            amount: 67.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.especiais,
        internet: "5,5GB",
        TJinternet: "5GB + 500MB de bônus*",
        mainoffer: true,
        appname: "vivocontrolekantoo",
        SKU: ["VC00030", "VIVOCTRLF59N"],
        hideapps: true,
        appsText: "GoRead, Vivo Cloud Sync, NBA e Kantoo Inglês",
        appsimg: "group-apps-semwhats",
        fidelizado: false,
        price: {
            amount: 82.99,
            discount: 0,
            perLine: 0
        }
    })
];

plansControle = new RegionItems(plansControle);

//documentos Plano Promo
var documentosPromo = [
    // nacional
    new Documento({
        region: regions.nacional,
        nome: "Regulamento Promoção Vivo Controle Digital",
        link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766"
    }),
    // ne
    new Documento({
        region: regions.especiais,
        nome: "Regulamento Promoção Vivo Controle Digital",
        link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766"
    })
    // // criticos
    // new Documento({
    //     region: regions.criticos,
    //     nome: "Regulamento Promoção Vivo Controle Digital",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766"
    // }),
    // // DDD 21
    // new Documento({
    //     region: regions.ddd21,
    //     nome: "Regulamento Promoção Vivo Controle Digital",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766"
    // }),
    // r4 - santa catarina
    // new Documento({
    //     region: regions.sc,
    //     nome: 'Regulamento Promoção Vivo Controle Digital',
    //     link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766'
    // }),
    // rs
    // new Documento({
    //     region: regions.rs,
    //     nome: "Regulamento Promoção Vivo Controle Digital",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766"
    // })
];

//documentos modal
var documentosModal = [
    // críticos e DDD21
    new Documento({
        region: regions.nacional,
        nome: "Regulamento Promoção Vivo Controle Giga",
        link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_100158",
        lightBox: false
    }),
    new Documento({
        region: regions.especiais,
        nome: "Regulamento Promoção Vivo Controle Digital",
        link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138767",
        lightBox: false
    })
    // new Documento({
    //     region: regions.ddd21,
    //     nome: "Regulamento Promoção Vivo Controle Digital",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146475",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: [regions.criticos, regions.ddd21],
    //     nome: "Regulamento Promoção Vivo Controle Pass",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146482",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.criticos,
    //     nome: "Regulamento Promoção Vivo Controle Pass Digital",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146478",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.ddd21,
    //     nome: "Regulamento Promoção Vivo Controle Pass Digital",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146479",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.criticos,
    //     nome: "Regulamento Promoção Vivo Controle Giga com Cartão",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_110894",
    //     lightBox: false
    // }),
    // nordeste
    // new Documento({
    //     region: regions.ne,
    //     nome: "Regulamento Promoção Vivo Controle Giga",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_100158",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.ne,
    //     nome: "Regulamento Promoção Vivo Controle Digital",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138768",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.ne,
    //     nome: "Regulamento Promoção Vivo Controle Pass",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146481",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.ne,
    //     nome: "Regulamento Promoção Vivo Controle Pass Digital",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146477",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.ne,
    //     nome: "Regulamento Promoção Vivo Controle Giga com Cartão",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_110896",
    //     lightBox: false
    // }),
    // // nacional
    // new Documento({
    //     region: regions.nacional,
    //     nome: "Regulamento Promoção Vivo Controle Giga",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_100158",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.nacional,
    //     nome: "Regulamento Promoção Vivo Controle Digital",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.nacional,
    //     nome: "Regulamento Promoção Vivo Controle Pass",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146480",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.nacional,
    //     nome: "Regulamento Promoção Vivo Controle Pass Digital",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146476",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.nacional,
    //     nome: "Regulamento Promoção Vivo Controle Giga com Cartão",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_110895",
    //     lightBox: false
    // }),
    // // Nacional
    // new Documento({
    //     region: regions.nacional,
    //     nome: "Regulamento Vivo Internet Adicional 150MB+400MB",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_160520",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: [regions.criticos, regions.ddd21],
    //     nome: "Regulamento Vivo Internet Adicional 150MB+400MB",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_160520",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.ne,
    //     nome: "Regulamento Vivo Internet Adicional 150MB+400MB",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_160520",
    //     lightBox: false
    // }),
    // // Nacional
    // /*new Documento({
    //     region: regions.nacional,
    //     nome: 'Consulte o Regulamento SmartVivo Controle Cartão',
    //     link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_175887',
    //     lightBox: false
    // }),*/
    // // Nacional
    // new Documento({
    //     region: regions.nacional,
    //     nome: "Regra de liberação dos seus créditos e benefícios",
    //     link: "https://www.vivo.com.br/portalweb/appmanager/env/web?_nfls=false&amp;_nfpb=true&amp;_pageLabel=P83400182821390338153573",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: [regions.criticos, regions.ddd21],
    //     nome: "Regra de liberação dos seus créditos e benefícios",
    //     link: "https://www.vivo.com.br/portalweb/appmanager/env/web?_nfls=false&amp;_nfpb=true&amp;_pageLabel=P83400182821390338153573",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.ne,
    //     nome: "Regra de liberação dos seus créditos e benefícios",
    //     link: "https://www.vivo.com.br/portalweb/appmanager/env/web?_nfls=false&amp;_nfpb=true&amp;_pageLabel=P83400182821390338153573",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.controleVivoMovelFixoExcetoDdds,
    //     nome: "Regulamento Desconto Controle Vivo Móvel + Vivo Fixo",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_117731",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.controleVivoMovelFixoDdds,
    //     nome: "Regulamento Desconto Controle Vivo Móvel + Vivo Fixo",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_117732",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.ne,
    //     nome: "Regulamento Desconto Controle Vivo Móvel + Vivo Fixo",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_117733",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.nacional,
    //     nome: "Regulamento Bônus Portabilidade Controle",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146522",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.nacionalRs,
    //     nome: "Contrato de prestação de serviço móvel pessoal pós-pago",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_184195",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.nacionalRs,
    //     nome: "Contrato de adesão ao serviço Vivo Internet Móvel",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_184194",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.rs,
    //     nome: "Contrato de prestação de serviço móvel pessoal pós-pago",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_186410",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.rs,
    //     nome: "Contrato de adesão ao serviço Vivo Internet Móvel",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_186409",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: [regions.criticos, regions.ne, regions.ddd21],
    //     nome: "Regulamento Bônus Portabilidade Controle",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146521",
    //     lightBox: false
    // }),
    // // Nacional
    // new Documento({
    //     region: regions.nacional,
    //     nome: "Regulamento Pacotes Adicionais Recorrentes Controle",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_197003",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: [regions.criticos, regions.ddd21],
    //     nome: "Regulamento Pacotes Adicionais Recorrentes Controle",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_197003",
    //     lightBox: false
    // }),
    // new Documento({
    //     region: regions.ne,
    //     nome: "Regulamento Pacotes Adicionais Recorrentes Controle",
    //     link: "https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_197003",
    //     lightBox: false
    // })
    // r4 - santa catarina
    // new Documento({
    //     region: regions.sc,
    //     nome: 'Regulamento Pacotes Adicionais Recorrentes Controle',
    //     link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_197003',
    //     lightBox: false
    // })
];

documentosModal = new RegionItems(documentosModal);
documentosPromo = new RegionItems(documentosPromo);

import Helpers from "../services/Helpers";
import DataLayer from "../services/DataLayer";
import ModalInformacoesAdicionais from "../components/ModalInformacoesAdicionais";

class Regionalization {
    constructor() {
        this.initRegionalization();
        this.initCarousel();
        this.toggleCardBody();
    }

    initRegionalization() {
        var helpers = new Helpers();
        var datalayer = new DataLayer();

        var currentDDD = this.getCookie("controle_ddd");
        var decodeCidade = this.getCookie("controle_cidade");
        var regional = decodeURI(decodeCidade);
        var userReg = this.getCookie("controle_estado");
        var parameters = window.location.search;
        var appname = this.getUrlParameter("banner");
        var critico;

        $(".ciudad")
            .find("p")
            .text(regional + " - " + userReg);
        $(".mobile-ciudad")
            .find("p")
            .text(regional + " - " + userReg);

        if (helpers.isMobile() || helpers.isTablet()) $("body").addClass("regionalized");

        parameters = window.location.search;

        var isRegionalized = false;
        var displayedDdds = $('#listaDdd li[style*="display: block"]');
        for (var i = 0; i < displayedDdds.length; i++) {
            if (window.currentDDD == displayedDdds[i].innerHTML) {
                window.isRegionalized = true;
            }
        }

        window.regionalizaStarts = true;

        var splitCidade = regional.split(" - ")[0];
        if (splitCidade.substring(splitCidade.length - 3, splitCidade.length) == "%20") {
            splitCidade = splitCidade.substring(0, splitCidade.length - 3);
        }
        var getCidade = splitCidade;

        //MONTAGEM DOS CARDS
        var currentPlans = plansControle.get(appname) || plansControle.get(currentDDD) || plansControle.get(regional) || plansControle.get("nacional");

        var self = this;

        if ($(".inner-planos-mobile").hasClass("slick-initialized")) {
            $(".inner-planos-mobile").slick("unslick");
        }
        $(".item-plan").remove();

        currentPlans.sort(function(a, b) {
            return a.price.amount - b.price.amount;
        });

        var prices = `${currentPlans[0].price.amount}`.split(".");

        //Re-init default banner with prices
        this.queryStringHandler = new QueryStringHandler();
        this.queryStringHandler.parseURLParam();

        $(".banner-price-value").text(`${prices[0]}`);
        // $('.subprice').text(prices[1]);
        if (currentPlans[0].internet == "") {
            $('[data-target="franquia"]').remove();
        } else {
            $(".internet-gb").text(currentPlans[0].internet);
            $('[data-target="franquia"]').addClass("regionalized");
        }

        let btnAssineJa = $('[data-target="link-banner-assine-ja"]');
        btnAssineJa.attr("href", `https://planos.vivo.com.br/vivostorefront/contrate?site=vivocontrolle&plano=${currentPlans[0].SKU[1]}&uf=${userReg}&cidade=${getCidade}&origem=lpcontrolegiga`);
        btnAssineJa.attr("data-analytics-id", "click-cta");
        btnAssineJa.attr("data-analytics-product-name", `${currentPlans[0].internet}`);
        btnAssineJa.attr("data-analytics-position", "destaque");
        btnAssineJa.attr("data-analytics-sku", `${currentPlans[0].SKU[1]}`);
        btnAssineJa.attr("data-analytics-label", "assine-ja");

        $(".item-plan").remove();

        if (currentDDD == 81 || currentDDD == 87) {
            $(".lp_controle_planos").removeAttr("style")
            $(".nacional").hide();
            $(".nao-nacional").show();
            $(".promo-icons-wrap").find("img").attr("src", "img/groups-icons_apps_pernambuco.png");
        } else {
            $(".nacional").show();
            $(".nao-nacional").hide();
            $(".lp_controle_planos").removeAttr("style")
        }
        $(".blur-gb").hide();
        $(".on-load").removeAttr("style")
        $(".container_planos").removeAttr("style")

        currentPlans.map(function(plano, index) {
            var prices = `${plano.price.amount}`.split(".");
            var linkPlan = plano.SKU[1];
            var appInclusos = plano.appsText;

            self.critico = plano.critico;

            if (plano.fidelizado) {
                $(".inner-planos.fidelizado, .inner-planos-mobile.fidelizado").append(`
                    <div class="item-plan">
                        <div class="quantidade-plan">
                            <p class="quantidade-plan--big-text">${plano.internet}</p>
                            <p>${plano.TJinternet}</p>
                        </div>
                        <div class="info-plan">
                            <p><strong>Apps ilimitados</strong><br/>
                                <img class="apps-ilimitados" src="img/icon/icon-${plano.appsimg}.png" />
                            </p>
                            <p><strong>Ligações ilimitadas</strong> para qualquer operadora do Brasil</p>
                            ${plano.hideapps ? `` : `<p><strong>Apps inclusos:</strong> ${plano.appsText}</p>`}
                        </div>
                        <a class="detalhes" href="" data-analytics-id="click-more-information" data-analytics-product-name="${plano.internet}" data-analytics-position="card-ofertas" data-analytics-sku="${plano.SKU[1]}" data-analytics-label="+beneficios">+ benefícios</a>
                        <div class="precio-plan">
                            <p class="precio-plan--big-text">R$ ${prices[0]}</p>
                            <p>,${prices[1]} <span>/mês</span></p>
                        </div>
                        <p class="disclaimer">Permanência em 12 meses</p>   
                        <div class="assine">
                            <a href="https://planos.vivo.com.br/vivostorefront/contrate?site=vivocontrolle&plano=${linkPlan}&uf=${userReg}&cidade=${getCidade}&origem=lpcontrolegiga" data-analytics-id="click-cta" data-analytics-product-name="${plano.internet}" data-analytics-position="card-ofertas" data-analytics-sku="${plano.SKU[1]}" data-analytics-label="assine-ja">Assine já</a>
                        </div>
                        <a class="informacoes" data-category="anual" target="_blank" data-analytics-id="click-more-information" data-analytics-product-name="${plano.internet}" data-analytics-position="card-ofertas" data-analytics-sku="${plano.SKU[1]}" data-analytics-label="informacoes">+Informações</a>
                    </div>
                `);
            }
            if (!plano.fidelizado) {
                $(".inner-planos.nao-fidelizado, .inner-planos-mobile.nao-fidelizado").append(`
                <div class="item-plan">
                    <div class="quantidade-plan">
                        <p class="quantidade-plan--big-text">${plano.internet}</p>
                        <p>${plano.TJinternet}</p>
                    </div>
                    <div class="info-plan">
                        <p><strong>Apps ilimitados</strong><br/>
                            <img class="apps-ilimitados" src="img/icon/icon-${plano.appsimg}.png" />
                        </p>
                        <p><strong>Ligações ilimitadas</strong> locais para todas as operadoras</p>
                        ${plano.hideapps ? `` : `<p><strong>Apps inclusos:</strong> ${plano.appsText}</p>`}
                    </div>
                    <a class="detalhes" href="" data-analytics-id="click-more-information" data-analytics-product-name="${plano.internet}" data-analytics-position="card-ofertas" data-analytics-sku="${plano.SKU[1]}" data-analytics-label="+beneficios">+ benefícios</a>
                    <div class="precio-plan">
                        <p class="precio-plan--big-text">R$ ${prices[0]}</p>
                        <p>,${prices[1]} <span>/mês</span></p>
                    </div>
                    <p class="disclaimer"></p>   
                    <div class="assine">
                        <a href="https://planos.vivo.com.br/vivostorefront/contrate?site=vivocontrolle&plano=${linkPlan}&uf=${userReg}&cidade=${getCidade}&origem=lpcontrolegiga" data-analytics-id="click-cta" data-analytics-product-name="${plano.internet}" data-analytics-position="card-ofertas" data-analytics-sku="${plano.SKU[1]}" data-analytics-label="assine-ja">Assine já</a>
                    </div>
                    <a class="informacoes" data-category="mensal" target="_blank" data-analytics-id="click-more-information" data-analytics-product-name="${plano.internet}" data-analytics-position="card-ofertas" data-analytics-sku="${plano.SKU[1]}" data-analytics-label="informacoes">+Informações</a>
                </div>
            `);
            }

            if (currentDDD == 81 || currentDDD == 87) {
                $(".linkappsinclusos").hide();
                $(".container_planos").addClass("pernambuco")
            }else{
                $(".linkappsinclusos").show();
                $(".container_planos").removeClass("pernambuco")
            }

            $(".item-plan")
                .css("opacity", "1")
                .css("display", "block");

            $(".detalhes").on("click", function(e) {
                e.preventDefault();
                if ($(".hidden-details").is(":visible")) {
                    $(".hidden-details").slideUp(200);
                    $(".detalhes").text("+ benefícios");
                } else {
                    $(".hidden-details").slideDown(200);
                    $(".detalhes").text("- benefícios");
                }
                e.stopImmediatePropagation();
            });
        });

        if (helpers.isMobile() || helpers.isTablet()) {
            var planos = new Planos();
        }

        $(".informacoes").on("click", function(e) {
            e.preventDefault();
            let modalInfo = new ModalInformacoesAdicionais();
            modalInfo.setContent( $(this).data("category") );
            
            modalInfo.showModal();
        });

        $(".informacoes2").on("click", function(e) {
            e.preventDefault();
            let modalInfo = new ModalInformacoesAdicionais();
            modalInfo.setContent(self.critico, self.r4);
            if ($(this).data("regulamento") !== undefined) modalInfo.addUrlRegulamento($(this).data("nmregulamento"), $(this).data("regulamento"));
            modalInfo.showModal();
        });

        if ($(window).width() >= 768) {
            this.setCardWidth();
        }

        // documentos NBA
        var currentDocumento = documentosPromo.get(currentDDD) || documentosPromo.get(regional) || documentosPromo.get("nacional");
        var listaRegulamentos = $(".combo-regulamento p");
        listaRegulamentos.empty();
        for (var i = 0, len = currentDocumento.length; i < len; i++) {
            var documento = currentDocumento[i];
            var link = "A navegação nos serviços digitais é descontada da franquia de internet (consumo médio GoRead: 80MB por revista; Kantoo Inglês: 23MB por lição; NBA: 320MB streaming de 15 min; Vivo Cloud Sync 32GB: 2MB por foto armazenada).<br>" + "<a href=" + documento.link + " class='regulamento-link' target='_blank' title='Regulamento Promoção Vivo Controle Digital'> Confira o regulamento.</a>";
            listaRegulamentos.append(link);
        }

        //documentos modal
        var currentDocumentoModal = documentosModal.get(currentDDD) || documentosModal.get(regional) || documentosModal.get("nacional");
        var listaRegulamentosModal = $(".regulamentos__list");
        listaRegulamentosModal.empty();
        for (var i = 0, len = currentDocumentoModal.length; i < len; i++) {
            var documentoModal = currentDocumentoModal[i];
            var linkModal = "<li class='list__item'><a href=" + documentoModal.link + " target='_blank' title='" + documentoModal.nome + "'>" + documentoModal.nome + "</a></li>";
            listaRegulamentosModal.append(linkModal);
        }
    }

    toggleCardBody() {
        $(".toggle-card-body").bind("click", function(e) {
            var _boxTarget = $(e.currentTarget)
                .parent()
                .parent()
                .parent();
            _boxTarget.find(".card__advantages").slideToggle();

            if ($(this).text() == "- Detalhes") {
                _boxTarget.find(".toggle-card-body").text("+ Detalhes");
            } else {
                _boxTarget.find(".toggle-card-body").text("- Detalhes");
            }
        });
    }

    initCarousel() {
        var currentDDD = this.getCookie("controle_ddd");
        var decodeCidade = this.getCookie("controle_cidade");
        var regional = decodeURI(decodeCidade);
        var currentPlans = plansControle.get(currentDDD) || plansControle.get(regional) || plansControle.get("nacional");

        $(".plans .content").addClass("isSwiper");
        $(".plans .swiper-container").addClass("cards-swiper");
        $(".plans .swiper-wrapper").css({
            width: $(".plans").width() - (30 * currentPlans.length - 1)
        });

        var isCentered = true;
        $(".plans .content").addClass("hide");
        isCentered = false;

        var cardsPerPage = currentPlans.length;

        new Swiper(".plans .cards-swiper", {
            navigation: {
                nextEl: ".plans .swiper-button-next",
                prevEl: ".plans .swiper-button-prev"
            },

            simulateTouch: false,
            slidesPerView: currentPlans.length,
            spaceBetween: 30
        });

        if ($(".swiper-pagination-bullet").length == 3) {
            $(".swiper-buttons#bottom .swiper-button-prev").addClass("buttons-left");
            $(".swiper-buttons#bottom .swiper-button-next").addClass("buttons-right");
        }
        var paginationItems = $(".swiper-pagination span"),
            paginationContainer = $(".swiper-buttons#bottom");
        // check if there is pagination with less than two items
        if (paginationItems.length <= 1) {
            paginationContainer.remove();
            paginationItems.remove();
        }
        // End loading / show plans ...
    }

    setCardWidth() {
        var currentDDD = this.getCookie("controle_ddd");
        var decodeCidade = this.getCookie("controle_cidade");
        var regional = decodeURI(decodeCidade);
        var currentPlans = plansControle.get(currentDDD) || plansControle.get(regional) || plansControle.get("nacional");
        var planosAnanke = currentPlans.filter(function(e) {
            return !e.portal;
        }).length;

        var _w = 100 / planosAnanke;
        $(".plans__card").css("width", _w + "%");
    }

    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    abreBoxDdd() {
        document.getElementById("overlayDdd").style.display = "block";
        document.getElementById("box-select").style.display = "block";
        fadeIn("overlayDdd", 1.5);
    }

    slickInit() {
        $(".plans-carousel-mob").slick({
            arrows: false,
            dots: true,
            centerMode: true,
            centerPadding: "20px",
            slidesToShow: 1,
            infinite: false,
            variableWidth: true
        });
    }

    getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split("&"),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split("=");

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }

    UrlParameter() {
        // ALTERA O BANNER CASO A URL VENHA PARAMETRIZADA
        var getEstadoBan = this.getCookie("controle_estado");
        var getDDDBan = this.getCookie("controle_ddd");
        var decodeCidade = this.getCookie("controle_cidade");
        var regional = decodeURI(decodeCidade);
        var splitCidade = regional.split(" - ")[0];
        if (splitCidade.substring(splitCidade.length - 3, splitCidade.length) == "%20") {
            splitCidade = splitCidade.substring(0, splitCidade.length - 3);
        }
        var getCidade = splitCidade;

        var _nameBtn = "Contrate já",
            _banner = $(".banner"),
            _bannerContentOne = $(".banner__content--01"),
            _bannerContentExclusive = $(".banner__content--01 .content__exclusive .exclusive__block"),
            _bannerContentImg = $(".banner__content--01 .content__img"),
            _logoBanner = $(".banner__content--02 .content__logo"),
            _subtitle = $(".content__subtitle"),
            _subtitleIcon = $(".subtitle__icon"),
            _internetSizeBanner = $(".banner__content--02 .content__call .call__block .block__text"),
            _priceBanner = $(".banner__content--02 .content__price .price__block"),
            _paramBanner = this.getUrlParameter("banner");

        if (_paramBanner == "vivocontrolenba") {
            _banner.addClass("banner--green");
            _bannerContentOne.removeClass("banner__content--all");
            $(".banner__content--01 .content__exclusive .exclusive__block:nth-child(1)").addClass("display");
            _bannerContentExclusive.find(".logo__details").addClass("logo__details--white");
            _bannerContentImg.removeClass("content__img--all");
            _bannerContentImg.find(".img__cel").addClass("img__cel--nba");
            _priceBanner.find(".cents__monthly--with").addClass("hide");
        } else if (_paramBanner == "vivocontrolekantoo") {
            _banner.addClass("banner--kantoo");
            _bannerContentOne.removeClass("banner__content--all");
            $(".banner__content--01 .content__exclusive .exclusive__block:nth-child(2)").addClass("display");
            _bannerContentImg.removeClass("content__img--all");
            _bannerContentImg.find(".img__cel").addClass("img__cel--kantoo");
            _priceBanner.find(".cents__monthly--with").addClass("hide");
        } else if (_paramBanner == "vivocontrolekantoo") {
            _banner.addClass("banner--kantoo");
            _bannerContentOne.removeClass("banner__content--all");
            $(".banner__content--01 .content__exclusive .exclusive__block:nth-child(2)").addClass("display");
            _bannerContentImg.removeClass("content__img--all");
            _bannerContentImg.find(".img__cel").addClass("img__cel--kantoo");
            _priceBanner.find(".cents__monthly--with").addClass("hide");
        } else if (_paramBanner == "vivocontrolegoread") {
            $("#banner_goread").show();
            $("#banner_normal").hide();
            $(".giga").addClass("TXT_LARANJA");
            $(".txt_GB_1,.txt_GB_2,.txt_final_mobile").addClass("TXT_LARANJA");

            $(".banner").addClass("bannerGoread");
            $(".txt_conteudo_exclusivo").addClass("TXT_LARANJA");
            $(".content__logo").addClass("mobile_goread");
            $(".bg_teste").addClass("bn_goread");

            $(".banner__content--02").addClass("espaco_goread");

            var containerBannerGoread = $(".container_nv_lvf_uniao");
            $(containerBannerGoread).addClass("Novo__banner__goread");

            _nameBtn = "Saiba mais";
            _bannerContentOne.removeClass("banner__content--all");

            $(".banner__content--01 .content__exclusive .exclusive__block:nth-child(3)").addClass("display");

            _bannerContentExclusive.find(".logo__details").addClass("logo__details--white logo__details--size");

            _bannerContentImg.removeClass("content__img--all");
            _bannerContentImg.find(".img__cel").addClass("img__cel--goread");
            _banner.addClass("banner--purple");
            _logoBanner.addClass("content__logo--orange");
            _subtitle.addClass("orange");
            _subtitleIcon.attr("src", "img/icon/PW_IMG_LOGO4GMAIS_LARANJA.png");
            _internetSizeBanner.addClass("block__text--orange");
            _priceBanner.addClass("price__block--orange");
            _priceBanner.find(".cents__monthly--with").addClass("hide");

            // if( !window.isSlickCardsInit ){
            //     $('.plans-carousel-mob').slick({
            //         arrows: false,
            //         dots: true,
            //         centerMode: true,
            //         centerPadding: "20px",
            //         slidesToShow: 1,
            //         infinite: false,
            //         variableWidth: true
            //     });
        }

        // for (var size = 0; size < splitSearch.length; size++) {
        //     $('#banner_goread').hide();
        // }

        // ESPERA MONTAR O BANNER E MOSTRA

        // setTimeout(function() {
        //     _banner.fadeIn();
        // }, 1000);
    }
}

export default Regionalization;

'use strict';

import Planos from '../components/Planos';
import QueryStringHandler from '../components/QueryStringHandler';

var isArray = Function.isArray || function (o) {
    return typeof o === 'object' && Object.prototype.toString.call(o).slice(8, -1) === 'Array';
};

var Plan = (function () {
    Plan = function Plan(data) {
        for (var key in data) {
            if (!data.hasOwnProperty(key)) continue;

            this[key] = data[key];
        }
    };

    Plan.prototype.toJSON = function () {
        var o = {};

        for (key in this) {
            if (!this.hasOwnProperty(key)) continue;
            o[key] = this[key];
        }

        return o;
    };

    Plan.prototype.getPriceFull = function () {
        return this.price.amount;
    };

    Plan.prototype.getPrice = function () {
        var calcPrice = Math.round((this.price.amount - this.price.discount) * 100) / 100;
        return calcPrice.toFixed(2);
    };

    return Plan;
}());

var Documento = (function () {
    Documento = function Documento(data) {
        var keys = ['region', 'nome', 'link'];

        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            if (!data.hasOwnProperty(key)) continue;

            this[key] = data[key];
        }
    };

    return Documento;
}());


var Banner = (function () {
    Banner = function Banner(data) {
        var keys = ['region', 'franquia', 'minutos', 'valor'];

        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            if (!data.hasOwnProperty(key)) continue;

            this[key] = data[key];
        }
    };

    return Banner;
}());



var RegionItems = (function () {
    var _addItem = function (region, item, items) {

        if ((!isArray(region)) && typeof region !== "string" && typeof region !== "number") {
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
            this._region_items[key].sort(function (a, b) {
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

    RegionItems.prototype.get = function (key) {
        return this._region_items[key];
    };

    RegionItems.prototype.toJSON = function () {
        return this._region_items;
    };

    return RegionItems;
}());

var regions = require('../fill/regions.js').regions;

var plansControle = [
    // nacional
    new Plan({
        region: regions.nacional,
        r4: false,
        critico: false,
        internet: '5,5GB',
        TJinternet: '5GB + 500MB de bônus*',
        mainoffer: true,
        appname: "vivocontrolenba",
        SKU: ['VC00031', 'VIVOCTRLF29N'],
        combo: "GoRead - NBA - Sync - Kantoo - Vivo Guru",
        portal: false,
        price: {
            amount: 89.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.nacional,
        r4: false,
        critico: false,
        internet: '5GB',
        TJinternet: '4,5GB + 500MB de bônus*',
        mainoffer: true,
        appname: "vivocontrolekantoo",
        SKU: ['VC00030', 'VIVOCTRLF30N'],
        combo: "GoRead - NBA - Sync - Kantoo",
        portal: false,
        price: {
            amount: 79.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.nacional,
        r4: false,
        critico: false,
        internet: '4GB',
        TJinternet: '3,5GB + 500MB de bônus*',
        mainoffer: true,
        appname: "vivocontrolekantoo",
        SKU: ['VC00030', 'VIVOCTRLF28N'],
        combo: "GoRead - NBA - Sync - Kantoo",
        portal: false,
        price: {
            amount: 64.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.nacional,
        r4: false,
        critico: false,
        internet: '3GB',
        TJinternet: '2,5GB + 500MB de bônus*',
        mainoffer: true,
        SKU: ['VC00028', 'VIVOCTRLF27N'],
        combo: "GoRead - NBA - Sync",
        portal: false,
        appname: "vivocontrolegoread",
        price: {
            amount: 49.99,
            discount: 0,
            perLine: 0
        }
    }),

    // criticos, NE e 21
    new Plan({
        region: [regions.criticos, regions.ddd21, regions.ne],
        r4: false,
        internet: '6,5GB',
        critico: true,
        TJinternet: '6GB + 500MB de bônus*',
        mainoffer: true,
        appname: "vivocontrolenba",
        SKU: ['VC00031', 'VIVOCTRLF29A'],
        combo: "GoRead - NBA - Sync - Kantoo - Vivo Guru",
        portal: false,
        price: {
            amount: 89.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: [regions.criticos, regions.ddd21, regions.ne],
        r4: false,
        internet: '6GB',
        critico: true,
        TJinternet: '5,5GB + 500MB de bônus*',
        mainoffer: true,
        appname: "vivocontrolekantoo",
        SKU: ['VC00031', 'VIVOCTRLF30A'],
        combo: "GoRead - NBA - Sync - Kantoo",
        portal: false,
        price: {
            amount: 79.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: [regions.criticos, regions.ddd21, regions.ne],
        r4: false,
        internet: '5GB',
        critico: true,
        TJinternet: '4,5GB + 500MB de bônus*',
        mainoffer: true,
        appname: "vivocontrolekantoo",
        SKU: ['VC00031', 'VIVOCTRLF28A'],
        combo: "GoRead - NBA - Sync - Kantoo",
        portal: false,
        price: {
            amount: 64.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: [regions.criticos, regions.ddd21, regions.ne],
        r4: false,
        internet: '4GB',
        critico: true,
        TJinternet: '3,5GB + 500MB de bônus*',
        mainoffer: true,
        appname: "vivocontrolegoread",
        SKU: ['VC00029', 'VIVOCTRLF27A'],
        combo: "GoRead - NBA - Sync",
        portal: false,
        price: {
            amount: 49.99,
            discount: 0,
            perLine: 0
        },
        linkCTA: ['Contratar', 'https://lojaonline.vivo.com.br/vivostorefront/bundle/view-plans/1?userActionPlanOption=newPlanAcquisition&platform=CONTROLE']
    }),
    
    // r4 - santa catarina
    new Plan({
        region: regions.sc,
        internet: '6GB',
        r4: true,
        critico: true,
        TJinternet: '5,5GB + 500MB de bônus*',
        mainoffer: true,
        SKU: [''],
        combo: "GoRead - NBA - Sync",
        portal: false,
        appname: "vivocontrolenba",
        price: {
            amount: 76.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.sc,
        internet: '6GB',
        r4: true,
        critico: true,
        TJinternet: '5,5GB + 500MB de bônus*',
        mainoffer: true,
        SKU: [''],
        combo: "GoRead - NBA - Sync",
        portal: false,
        appname: "vivocontrolekantoo",
        price: {
            amount: 76.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.sc,
        internet: '5GB',
        r4: true,
        critico: true,
        TJinternet: '4,5GB + 500MB de bônus*',
        mainoffer: true,
        SKU: [''],
        combo: "GoRead - NBA - Sync",
        portal: false,
        appname: "vivocontrolekantoo",
        price: {
            amount: 61.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.sc,
        internet: '4GB',
        r4: true,
        critico: true,
        TJinternet: '3,5GB + 500MB de bônus*',
        mainoffer: true,
        SKU: ['VIVOCTRLF26N','VIVOCTRLF26A'],
        combo: "",
        portal: false,
        appname: "vivocontrolegoread",
        price: {
            amount: 46.99,
            discount: 0,
            perLine: 0
        },
    })
]

plansControle = new RegionItems(plansControle);

//documentos Plano Promo
var documentosPromo = [
    // nacional
    new Documento({
        region: regions.nacional,
        nome: 'Regulamento Promoção Vivo Controle Digital',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766'
    }),
    // ne
    new Documento({
        region: regions.ne,
        nome: 'Regulamento Promoção Vivo Controle Digital',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766'
    }),
    // criticos
    new Documento({
        region: regions.criticos,
        nome: 'Regulamento Promoção Vivo Controle Digital',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766'
    }),
    // DDD 21
    new Documento({
        region: regions.ddd21,
        nome: 'Regulamento Promoção Vivo Controle Digital',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766'
    }),
    // r4 - santa catarina
    new Documento({
        region: regions.sc,
        nome: 'Regulamento Promoção Vivo Controle Digital',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766'
    }),
    // rs
    new Documento({
        region: regions.rs,
        nome: 'Regulamento Promoção Vivo Controle Digital',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766'
    })
];


//documentos modal
var documentosModal = [
    // críticos e DDD21
    new Documento({
        region: [regions.criticos, regions.ddd21],
        nome: 'Regulamento Promoção Vivo Controle Giga',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_100158',
        lightBox: false
    }),
    new Documento({
        region: regions.criticos,
        nome: 'Regulamento Promoção Vivo Controle Digital',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138767',
        lightBox: false
    }),
    new Documento({
        region: regions.ddd21,
        nome: 'Regulamento Promoção Vivo Controle Digital',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146475',
        lightBox: false
    }),
    new Documento({
        region: [regions.criticos, regions.ddd21],
        nome: 'Regulamento Promoção Vivo Controle Pass',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146482',
        lightBox: false
    }),
    new Documento({
        region: regions.criticos,
        nome: 'Regulamento Promoção Vivo Controle Pass Digital',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146478',
        lightBox: false
    }),
    new Documento({
        region: regions.ddd21,
        nome: 'Regulamento Promoção Vivo Controle Pass Digital',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146479',
        lightBox: false
    }),
    new Documento({
        region: regions.criticos,
        nome: 'Regulamento Promoção Vivo Controle Giga com Cartão',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_110894',
        lightBox: false
    }),
    // nordeste
    new Documento({
        region: regions.ne,
        nome: 'Regulamento Promoção Vivo Controle Giga',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_100158',
        lightBox: false
    }),
    new Documento({
        region: regions.ne,
        nome: 'Regulamento Promoção Vivo Controle Digital',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138768',
        lightBox: false
    }),
    new Documento({
        region: regions.ne,
        nome: 'Regulamento Promoção Vivo Controle Pass',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146481',
        lightBox: false
    }),
    new Documento({
        region: regions.ne,
        nome: 'Regulamento Promoção Vivo Controle Pass Digital',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146477',
        lightBox: false
    }),
    new Documento({
        region: regions.ne,
        nome: 'Regulamento Promoção Vivo Controle Giga com Cartão',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_110896',
        lightBox: false
    }),
    // nacional
    new Documento({
        region: regions.nacional,
        nome: 'Regulamento Promoção Vivo Controle Giga',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_100158',
        lightBox: false
    }),
    new Documento({
        region: regions.nacional,
        nome: 'Regulamento Promoção Vivo Controle Digital',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766',
        lightBox: false
    }),
    new Documento({
        region: regions.nacional,
        nome: 'Regulamento Promoção Vivo Controle Pass',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146480',
        lightBox: false
    }),
    new Documento({
        region: regions.nacional,
        nome: 'Regulamento Promoção Vivo Controle Pass Digital',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146476',
        lightBox: false
    }),
    new Documento({
        region: regions.nacional,
        nome: 'Regulamento Promoção Vivo Controle Giga com Cartão',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_110895',
        lightBox: false
    }),
    // Nacional
    new Documento({
        region: regions.nacional,
        nome: 'Regulamento Vivo Internet Adicional 150MB+400MB',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_160520',
        lightBox: false
    }),
    new Documento({
        region: [regions.criticos, regions.ddd21],
        nome: 'Regulamento Vivo Internet Adicional 150MB+400MB',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_160520',
        lightBox: false
    }),
    new Documento({
        region: regions.ne,
        nome: 'Regulamento Vivo Internet Adicional 150MB+400MB',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_160520',
        lightBox: false
    }),
    // Nacional
    /*new Documento({
        region: regions.nacional,
        nome: 'Consulte o Regulamento SmartVivo Controle Cartão',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_175887',
        lightBox: false
    }),*/
    // Nacional
    new Documento({
        region: regions.nacional,
        nome: 'Regra de liberação dos seus créditos e benefícios',
        link: 'https://www.vivo.com.br/portalweb/appmanager/env/web?_nfls=false&amp;_nfpb=true&amp;_pageLabel=P83400182821390338153573',
        lightBox: false
    }),
    new Documento({
        region: [regions.criticos, regions.ddd21],
        nome: 'Regra de liberação dos seus créditos e benefícios',
        link: 'https://www.vivo.com.br/portalweb/appmanager/env/web?_nfls=false&amp;_nfpb=true&amp;_pageLabel=P83400182821390338153573',
        lightBox: false
    }),
    new Documento({
        region: regions.ne,
        nome: 'Regra de liberação dos seus créditos e benefícios',
        link: 'https://www.vivo.com.br/portalweb/appmanager/env/web?_nfls=false&amp;_nfpb=true&amp;_pageLabel=P83400182821390338153573',
        lightBox: false
    }),
    new Documento({
        region: regions.controleVivoMovelFixoExcetoDdds,
        nome: 'Regulamento Desconto Controle Vivo Móvel + Vivo Fixo',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_117731',
        lightBox: false
    }),
    new Documento({
        region: regions.controleVivoMovelFixoDdds,
        nome: 'Regulamento Desconto Controle Vivo Móvel + Vivo Fixo',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_117732',
        lightBox: false
    }),
    new Documento({
        region: regions.ne,
        nome: 'Regulamento Desconto Controle Vivo Móvel + Vivo Fixo',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_117733',
        lightBox: false
    }),
    new Documento({
        region: regions.nacional,
        nome: 'Regulamento Bônus Portabilidade Controle',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146522',
        lightBox: false
    }),
    new Documento({
        region: regions.nacionalRs,
        nome: 'Contrato de prestação de serviço móvel pessoal pós-pago',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_184195',
        lightBox: false
    }),
    new Documento({
        region: regions.nacionalRs,
        nome: 'Contrato de adesão ao serviço Vivo Internet Móvel',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_184194',
        lightBox: false
    }),
    new Documento({
        region: regions.rs,
        nome: 'Contrato de prestação de serviço móvel pessoal pós-pago',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_186410',
        lightBox: false
    }),
    new Documento({
        region: regions.rs,
        nome: 'Contrato de adesão ao serviço Vivo Internet Móvel',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_186409',
        lightBox: false
    }),
    new Documento({
        region: [regions.criticos, regions.ne, regions.ddd21],
        nome: 'Regulamento Bônus Portabilidade Controle',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_146521',
        lightBox: false
    }),
    // Nacional
    new Documento({
        region: regions.nacional,
        nome: 'Regulamento Pacotes Adicionais Recorrentes Controle',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_197003',
        lightBox: false
    }),
    new Documento({
        region: [regions.criticos, regions.ddd21],
        nome: 'Regulamento Pacotes Adicionais Recorrentes Controle',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_197003',
        lightBox: false
    }),
    new Documento({
        region: regions.ne,
        nome: 'Regulamento Pacotes Adicionais Recorrentes Controle',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_197003',
        lightBox: false
    }),
    // r4 - santa catarina
    new Documento({
        region: regions.sc,
        nome: 'Regulamento Pacotes Adicionais Recorrentes Controle',
        link: 'https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_197003',
        lightBox: false
    })
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

        var currentDDD = this.getCookie('controle_ddd');
        var decodeCidade = this.getCookie('controle_cidade');
        var regional = decodeURI(decodeCidade);
        var userReg = this.getCookie('controle_estado');
        var parameters = window.location.search;
        var appname = this.getUrlParameter('banner');
        var critico;

        $('.ciudad').find('p').text(regional + ' - ' + userReg);
        $('.mobile-ciudad').find('p').text(regional + ' - ' + userReg);

        if (helpers.isMobile() || helpers.isTablet()) $('body').addClass("regionalized");

        parameters = window.location.search;

        var isRegionalized = false;
        var displayedDdds = $('#listaDdd li[style*="display: block"]');
        for (var i = 0; i < displayedDdds.length; i++) {
            if (window.currentDDD == displayedDdds[i].innerHTML) {
                window.isRegionalized = true;
            }
        }

        window.regionalizaStarts = true;

        var splitCidade = regional.split(' - ')[0];
        if (splitCidade.substring(splitCidade.length - 3, splitCidade.length) == "%20") {
            splitCidade = splitCidade.substring(0, splitCidade.length - 3);
        }
        var getCidade = splitCidade;
        var locationSearch = window.location.search,
            splitSearch = locationSearch.replace('?', '').split('&');

        var _banner = $('.banner__content'),
            _logoBanner = $('.banner__content .banner__logo'),
            _subtitle = $('.banner__subtitle'),
            _subtitleIcon = $('.subtitle__icon'),
            _priceBanner = $('.banner__content .banner__info__price .price__block'),
            _paramBanner = "vivocontrolegoread";


        var linkPlan;

        //MONTAGEM DOS CARDS

        var currentPlans = plansControle.get(appname) || plansControle.get(currentDDD) || plansControle.get(regional) || plansControle.get("nacional");
        // var currentPlans = plansControle.get(currentDDD) || plansControle.get(regional) || plansControle.get("nacional"); //@TODO NEW

        // banner com card dinamico
        var container__plans = $(".plans .content").find('.swiper-wrapper');
        var container__plansMob = $(".plans .plans-carousel-mob");
        var container__StaticPlanos = $(".plans .static-plan-cards");
        container__plans.empty();
        container__plansMob.empty();
        container__StaticPlanos.empty();

        var planosAnanke = currentPlans.filter(function (e) {
            return !e.portal;
        }).length;

        var mainoffer_active = false;
        var self = this;

        if ($('.inner-planos-mobile').hasClass('slick-initialized')) {
            $(".inner-planos-mobile").slick("unslick");
        }
        $('.item-plan').remove();


        currentPlans.sort(function (a, b) {
            return a.price.amount - b.price.amount
        })

        var prices = `${currentPlans[0].price.amount}`.split('.');

        //Re-init default banner with prices
        this.queryStringHandler = new QueryStringHandler();
        this.queryStringHandler.parseURLParam();

        // $('span.preco').text(`${prices[0]},`);
        // $('.subprice').text(prices[1]);
        if (currentPlans[0].internet == "") {
            $('[data-target="franquia"]').remove();
        } else {
            $('.internet-gb').text(currentPlans[0].internet);
            $('[data-target="franquia"]').addClass('regionalized');
        }

        let btnAssineJa = $('[data-target="link-banner-assine-ja"]');
        btnAssineJa.attr("href", `https://planos.vivo.com.br/vivostorefront/contrate?site=vivocontrolle&plano=${currentPlans[0].SKU[1]}&uf=${userReg}&cidade=${getCidade}&origem=lpcontrolegiga`);
        btnAssineJa.attr("data-analytics-id", "click-cta");
        btnAssineJa.attr("data-analytics-product-name", `${currentPlans[0].internet}`);
        btnAssineJa.attr("data-analytics-position", "destaque");
        btnAssineJa.attr("data-analytics-sku", `${currentPlans[0].SKU[1]}`);
        btnAssineJa.attr("data-analytics-label", "assine-ja");

        currentPlans.map(function (plano, index) {
            var prices = `${plano.price.amount}`.split('.');
            var linkPlan = plano.SKU[1];

            if (index === 0) {
                var appInclusos = 'GoRead, Vivo Cloud Sync e NBA';
            } else if (index === 1) {
                var appInclusos = 'GoRead, Vivo Cloud Sync, NBA e Kantoo Inglês';
            } else if (index === 2) {
                var appInclusos = 'GoRead, Vivo Cloud Sync, Vivo Guru, NBA e Kantoo Inglês';
            } else {
                var appInclusos = 'GoRead, Vivo Cloud Sync, NBA';
            }

            if (currentPlans.length - 1 !== index) {
    
                self.critico = plano.critico;
                self.r4 = plano.r4; // regionalização de SC

                $('.inner-planos, .inner-planos-mobile').append(`
                    <div class="item-plan">
                        <div class="quantidade-plan">
                            <p class="quantidade-plan--big-text">${plano.internet}</p>
                            <p>${plano.TJinternet}</p>
                        </div>
                        <div class="whatsapp-plan">
                            
                            <div class="brand-whatsapp">
                                <img class="feature-item-gigas" alt="WhatsApp" title="WhatsApp" src="img/novo/icons/logo_whatsapp_2.png" />
                                <div>
                                    <h4>WhatsApp Ilimitado</h4>
                                    <p>Para mensagens, vídeos e fotos.</p>
                                </div>
                            </div>
                        </div>
                        <div class="info-plan">
                            <p><strong>Ligações ilimitadas</strong> ${plano.critico || plano.r4 ? `para qualquer operadora do Brasil` : `locais para todas as operadoras`} </p>
                            ${plano.r4?``:`<p><strong>Apps inclusos:</strong> ${appInclusos}</p>`}
                            ${plano.critico || plano.r4 ? `` : ` <p class="hidden-details"><strong>Ligações ilimitadas</strong> pra fixos nacional e qualquer Vivo do Brasil com o código 15.</p>`}
                            <p class="hidden-details"><strong>SMS ilimitado</strong> para qualquer operadora do Brasil</p>
                        </div>
                        <a class="detalhes" href="" data-analytics-id="click-more-information" data-analytics-product-name="${plano.internet}" data-analytics-position="card-ofertas" data-analytics-sku="${plano.SKU[1]}" data-analytics-label="+beneficios">+ benefícios</a>
                        <div class="precio-plan">
                            <p class="precio-plan--big-text">R$ ${prices[0]}</p>
                            <p>,${prices[1]} <span>/mês</span></p>
                        </div>
                        ${index > 0 && plano.r4 ? `<div class="assine cta-chat">
                            <button class ="cta-chat__btn">Assine já</button>
                        </div>`: `<div class="assine"><a href="https://planos.vivo.com.br/vivostorefront/contrate?site=vivocontrolle&plano=${linkPlan}&uf=${userReg}&cidade=${getCidade}&origem=lpcontrolegiga" data-analytics-id="click-cta" data-analytics-product-name="${plano.internet}" data-analytics-position="card-ofertas" data-analytics-sku="${plano.SKU[1]}" data-analytics-label="assine-ja">Assine já</a>
                            </div>`}
                        <a class="informacoes" target="_blank" data-analytics-id="click-more-information" data-analytics-product-name="${plano.internet}" data-analytics-position="card-ofertas" data-analytics-sku="${plano.SKU[1]}" data-analytics-label="informacoes">+Informações</a>
                `);
        
                // <a class="regulamiento" target="_blank" href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766&_ga=2.260582477.1980575863.1538515923-298680962.1534272275&_gac=1.157856200.1537808383.Cj0KCQjwlqLdBRCKARIsAPxTGaVFbGTNLt_3EMjFNxUE9aqYZYjfwUwGYoq-DJFVFiNQgtWNvexXe7IaAibAEALw_wcB" data-analytics-id="click-more-information" data-analytics-product-name="${plano.internet}" data-analytics-position="card-ofertas" data-analytics-sku="${plano.SKU[1]}" data-analytics-label="regulamento">Regulamento</a> 

                $(".item-plan").css("opacity", "1").css("display", "block");
                $(".blur-gb").css("display", "none");

                $('.detalhes').on('click', function (e) {
                    e.preventDefault();
                    if ($('.hidden-details').is(":visible")) {
                        $('.hidden-details').slideUp(200);
                        $(".detalhes").text("+ benefícios");
                    } else {
                        $('.hidden-details').slideDown(200);
                        $(".detalhes").text("- benefícios");
                    }
                    e.stopImmediatePropagation();
                });
            }

            //Alterações específicas para regionalização de SC

            if(currentDDD == 42 || currentDDD == 47 || currentDDD == 48 || currentDDD == 49){

                var planosSemApp = $('.legal-planos a')[1];
                //Ocultar bloco de SVA
                $('.container-aplicativos').css('display','none');
                $('.lp_controle_4g').css('margin-top', '35px');

                //Alterações no Banner 
                $('.preco-container').children(':nth-child(1), :nth-child(3)').css('visibility','hidden');
                $('.preco-container').children('.preco').children(':nth-child(2)').text('46,');
                $('.legal-planos').find(planosSemApp).css('display','none');
            }
        });

        //Alterações em CTA redirecionando para Chat
        $('.cta-chat__btn').click(function(e){
            e.preventDefault;
            $("#modalChatdireto .box").append('<iframe src="https://gvt.custhelp.com/app/chat/chat_launch_movel/p/167" frameborder="0" height="600" width="320" data-hj-ignore-attributes=""></iframe>')
            $("#modalChatdireto").fadeIn("slow");
        });

        if (helpers.isMobile() || helpers.isTablet()) {
            // $( window ).trigger( "regionalized" );
            var planos = new Planos();
        }

        $(".informacoes").on('click', function (e) {
            e.preventDefault();
            let modalInfo = new ModalInformacoesAdicionais();
            modalInfo.setContent(self.critico, self.r4);
            if ($(this).data('regulamento') !== undefined) modalInfo.addUrlRegulamento($(this).data('nmregulamento'), $(this).data('regulamento'));
            modalInfo.showModal();
        });

        $(".informacoes2").on('click', function (e) {
            e.preventDefault();
            let modalInfo = new ModalInformacoesAdicionais();
            modalInfo.setContent(self.critico, self.r4);
            if ($(this).data('regulamento') !== undefined) modalInfo.addUrlRegulamento($(this).data('nmregulamento'), $(this).data('regulamento'));
            modalInfo.showModal();
        });

        if (currentDDD == 42 || currentDDD == 47 || currentDDD == 48 || currentDDD == 49) {
            $("[data-remove='sc']").hide();
        }else{
            $("[data-remove='sc']").show();
        }
        

        $(".btn--sigin").on('click', function (e) {
            var link = $(this).data('link');
            var sku = $(this).data('sku');
            var evento;
            if ($(this).hasClass('btn__sigin')) {
                evento = 'gauge.destaque-contrate-ja'
            } else {
                evento = 'gauge.card-assine-ja'
            }
            datalayer.sendDataLayerProducts(evento, userReg, regional, currentDDD, sku)
        })

        $(".toggle-card-body, .click_modal").on('click', function (e) {
            var evento;
            var sku = $(this).data('sku');
            if ($(this).hasClass('toggle-card-body')) {
                evento = "gauge.card-mais-detalhes"
            } else {
                evento = "gauge.card-mais-informacoes"
            }
            datalayer.sendDataLayerProducts(evento, userReg, regional, currentDDD, sku)
        })


        var cards = $('.plans__card');
        var apps;
        var padding = 10;
        var currentCardContent;
        var nextCardContent;
        var windowWidth = $(window).width();

        $('.plans__card.only-portal').remove();

        if ($(window).width() >= 768) {
            this.setCardWidth();
        }

        // documentos NBA
        var currentDocumento = documentosPromo.get(currentDDD) || documentosPromo.get(regional) || documentosPromo.get("nacional");
        var listaRegulamentos = $('.combo-regulamento p');
        listaRegulamentos.empty();
        for (var i = 0, len = currentDocumento.length; i < len; i++) {
            var documento = currentDocumento[i];
            var link = "A navegação nos serviços digitais é descontada da franquia de internet (consumo médio GoRead: 80MB por revista; Kantoo Inglês: 23MB por lição; NBA: 320MB streaming de 15 min; Vivo Cloud Sync 32GB: 2MB por foto armazenada).<br>" +
                "<a href=" + documento.link + " class='regulamento-link' target='_blank' title='Regulamento Promoção Vivo Controle Digital'> Confira o regulamento.</a>"
            listaRegulamentos.append(link);
        }

        //documentos modal
        var currentDocumentoModal = documentosModal.get(currentDDD) || documentosModal.get(regional) || documentosModal.get("nacional");
        var listaRegulamentosModal = $('.regulamentos__list');
        listaRegulamentosModal.empty();
        for (var i = 0, len = currentDocumentoModal.length; i < len; i++) {
            var documentoModal = currentDocumentoModal[i];
            var linkModal = "<li class='list__item'><a href=" + documentoModal.link + " target='_blank' title='" + documentoModal.nome + "'>" + documentoModal.nome + "</a></li>"
            listaRegulamentosModal.append(linkModal);
        }

        if (helpers.isDesktop()) {
            for (var j = cards.length; j > 0; j--) {
                currentCardContent = $('#card_' + j).find('.card__cont');
                nextCardContent = $('#card_' + (j - 1)).find('.card__cont');
                var calcPadding = (50 - (j * 10));
                var finalPadding = calcPadding + 'px 0';
                //console.log("finalPadding ", finalPadding);
                currentCardContent.css('padding', finalPadding);
                // $(".swiper-wrapper .plans__card").last().find('.card__cont').css("padding", "30px 0"); //@TODO NEW
            }
        }

        // this.UrlParameter();
        this.constroiModal();
        this.abasLista();
        this.vaiRegulamento();
        this.disableRightClickReg();
        // this.toggleCardBody();
    }

    toggleCardBody() {
        $('.toggle-card-body').bind('click', function (e) {
            var _boxTarget = $(e.currentTarget).parent().parent().parent();
            _boxTarget.find('.card__advantages').slideToggle();


            if ($(this).text() == '- Detalhes') {
                _boxTarget.find('.toggle-card-body').text('+ Detalhes');
            } else {
                _boxTarget.find('.toggle-card-body').text('- Detalhes');
            }
        });
    }

    initCarousel() {
        var currentDDD = this.getCookie('controle_ddd');
        var decodeCidade = this.getCookie('controle_cidade');
        var regional = decodeURI(decodeCidade);
        var currentPlans = plansControle.get(currentDDD) || plansControle.get(regional) || plansControle.get("nacional");

        // console.log(plansControle.get(currentDDD))
        $('.plans .content').addClass('isSwiper');
        $('.plans .swiper-container').addClass('cards-swiper');
        $(".plans .swiper-wrapper").css({
            width: $(".plans").width() - (30 * currentPlans.length - 1)
        });

        var isCentered = true;
        $('.plans .content').addClass('hide');
        isCentered = false;

        var cardsPerPage = currentPlans.length;

        new Swiper('.plans .cards-swiper', {
            navigation: {
                nextEl: '.plans .swiper-button-next',
                prevEl: '.plans .swiper-button-prev',
            },

            simulateTouch: false,
            slidesPerView: currentPlans.length,
            spaceBetween: 30
        });

        if ($('.swiper-pagination-bullet').length == 3) {
            $('.swiper-buttons#bottom .swiper-button-prev').addClass('buttons-left');
            $('.swiper-buttons#bottom .swiper-button-next').addClass('buttons-right');
        }
        var paginationItems = $('.swiper-pagination span'),
            paginationContainer = $('.swiper-buttons#bottom');
        // check if there is pagination with less than two items
        if (paginationItems.length <= 1) {
            paginationContainer.remove();
            paginationItems.remove();
        }
        // End loading / show plans ...

    }

    setCardWidth() {
        var currentDDD = this.getCookie('controle_ddd');
        var decodeCidade = this.getCookie('controle_cidade');
        var regional = decodeURI(decodeCidade);
        var currentPlans = plansControle.get(currentDDD) || plansControle.get(regional) || plansControle.get("nacional");
        var planosAnanke = currentPlans.filter(function (e) {
            return !e.portal;
        }).length;

        var _w = 100 / (planosAnanke);
        $(".plans__card").css('width', (_w) + '%');
    }

    // getGA() {
    //     var paramGA = (window.ga && ga.create);

    //     if (paramGA) {
    //         ga('require', 'linker');

    //         window.GAParam = "&" + ga.getAll()[0].get("linkerParam");
    //     }
    // }

    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    constroiModal() {
        var tipo_icon = "icon-reg";

        $(".box-modal .boxModalContent .icon-box").addClass(tipo_icon);


        if (tipo_icon == "icon-reg") {
            // $(".box-modal .boxModalContent .boxModalContent__box").addClass(" boxModalContent__box--reg");
            $(".box-modal .boxModalContent .boxModalContent__box").attr("id", "Default");
        }


        $(".click_modal").bind('click', function () {
            $(".box-overlay, .boxModalContent").fadeIn()
            $(".box-modal").addClass("modal-on");
            $(".box-modal").removeClass("modal-off");
            $(".modal-informacoes-adicionais").css("display", "block");
            $(".boxModalContent__box-text div[data-main-content=\"1\"]").focus();

            var gt_data = $(this).data('plan');
            $(".item #link_regulamento").attr("href", gt_data);

        });

        // $(".icon-close, .box-overlay").bind('click', function() {
        //     $(".modal-informacoes-adicionais").css("display", "none");
        //     $(".box-overlay, .boxModalContent").fadeOut();
        //     $(".box-modal").addClass("modal-off");
        //     $(".box-modal").removeClass("modal-on");
        // });

        $(document).keyup(function (e) {
            if (e.keyCode == 27) {
                $(".modal-informacoes-adicionais").css("display", "none");
                $(".box-overlay, .boxModalContent").fadeOut();
            }
        });

    }

    abasLista() {
        $(".boxModalContent__box-seletor li").bind('click', 'li', function () {

            $(".boxModalContent__box-seletor li").removeClass("active");

            var thumb_select = $(this).data('choose');

            $(".boxModalContent__box-text div[data-main-content]").hide();
            $(".boxModalContent__box-text div[data-main-content=" + thumb_select + "]").fadeIn("slow");
            $(".boxModalContent__box-text div[data-main-content=" + thumb_select + "]").focus();

            $(this).addClass("active");
        });
    }


    vaiRegulamento() {
        $("#goto_regu").bind('click', function () {

            $(".boxModalContent__box-seletor li").removeClass("active");
            $(".boxModalContent__box-seletor").find("[data-choose='3']").addClass("active");

            $(".boxModalContent__box-text div").css("display", "none");
            $(".boxModalContent__box-text").find("[data-main-content='3']").css("display", "block");
            $(".regulamentos__list").fadeIn();
        });
    }

    disableRightClickReg() {
        $('#goto_regu').bind("contextmenu", function (e) {
            e.preventDefault();
        });
    }

    abreBoxDdd() {
        document.getElementById('overlayDdd').style.display = 'block';
        document.getElementById('box-select').style.display = 'block';
        fadeIn('overlayDdd', 1.5);
    }

    slickInit() {

        $('.plans-carousel-mob').slick({
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
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }

    UrlParameter() {
        // ALTERA O BANNER CASO A URL VENHA PARAMETRIZADA
        var getEstadoBan = this.getCookie('controle_estado');
        var getDDDBan = this.getCookie('controle_ddd');
        var decodeCidade = this.getCookie('controle_cidade');
        var regional = decodeURI(decodeCidade);
        var splitCidade = regional.split(' - ')[0];
        if (splitCidade.substring(splitCidade.length - 3, splitCidade.length) == "%20") {
            splitCidade = splitCidade.substring(0, splitCidade.length - 3);
        }
        var getCidade = splitCidade;

        var _nameBtn = 'Contrate já',
            _banner = $('.banner'),
            _bannerContentOne = $('.banner__content--01'),
            _bannerContentExclusive = $('.banner__content--01 .content__exclusive .exclusive__block'),
            _bannerContentImg = $('.banner__content--01 .content__img'),
            _logoBanner = $('.banner__content--02 .content__logo'),
            _subtitle = $('.content__subtitle'),
            _subtitleIcon = $('.subtitle__icon'),
            _internetSizeBanner = $('.banner__content--02 .content__call .call__block .block__text'),
            _priceBanner = $('.banner__content--02 .content__price .price__block'),
            _paramBanner = this.getUrlParameter('banner');

        if (_paramBanner == 'vivocontrolenba') {
            _banner.addClass('banner--green');
            _bannerContentOne.removeClass('banner__content--all');
            $('.banner__content--01 .content__exclusive .exclusive__block:nth-child(1)').addClass('display');
            _bannerContentExclusive.find('.logo__details').addClass('logo__details--white');
            _bannerContentImg.removeClass('content__img--all');
            _bannerContentImg.find('.img__cel').addClass('img__cel--nba');
            _priceBanner.find('.cents__monthly--with').addClass('hide');
        } else if (_paramBanner == 'vivocontrolekantoo') {
            _banner.addClass('banner--kantoo');
            _bannerContentOne.removeClass('banner__content--all');
            $('.banner__content--01 .content__exclusive .exclusive__block:nth-child(2)').addClass('display');
            _bannerContentImg.removeClass('content__img--all');
            _bannerContentImg.find('.img__cel').addClass('img__cel--kantoo');
            _priceBanner.find('.cents__monthly--with').addClass('hide');
        } else if (_paramBanner == 'vivocontrolekantoo') {
            _banner.addClass('banner--kantoo');
            _bannerContentOne.removeClass('banner__content--all');
            $('.banner__content--01 .content__exclusive .exclusive__block:nth-child(2)').addClass('display');
            _bannerContentImg.removeClass('content__img--all');
            _bannerContentImg.find('.img__cel').addClass('img__cel--kantoo');
            _priceBanner.find('.cents__monthly--with').addClass('hide');
        } else if (_paramBanner == 'vivocontrolegoread') {
            $('#banner_goread').show();
            $('#banner_normal').hide();
            $('.giga').addClass('TXT_LARANJA');
            $('.txt_GB_1,.txt_GB_2,.txt_final_mobile').addClass('TXT_LARANJA');

            $('.banner').addClass('bannerGoread');
            $('.txt_conteudo_exclusivo').addClass('TXT_LARANJA');
            $('.content__logo').addClass('mobile_goread');
            $('.bg_teste').addClass('bn_goread');

            $('.banner__content--02').addClass('espaco_goread');


            var containerBannerGoread = $('.container_nv_lvf_uniao');
            $(containerBannerGoread).addClass('Novo__banner__goread')

            _nameBtn = 'Saiba mais';
            _bannerContentOne.removeClass('banner__content--all');

            $('.banner__content--01 .content__exclusive .exclusive__block:nth-child(3)').addClass('display');

            _bannerContentExclusive.find('.logo__details').addClass('logo__details--white logo__details--size');

            _bannerContentImg.removeClass('content__img--all');
            _bannerContentImg.find('.img__cel').addClass('img__cel--goread');
            _banner.addClass('banner--purple');
            _logoBanner.addClass('content__logo--orange');
            _subtitle.addClass('orange');
            _subtitleIcon.attr('src', 'img/icon/PW_IMG_LOGO4GMAIS_LARANJA.png');
            _internetSizeBanner.addClass('block__text--orange');
            _priceBanner.addClass('price__block--orange');
            _priceBanner.find('.cents__monthly--with').addClass('hide');

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

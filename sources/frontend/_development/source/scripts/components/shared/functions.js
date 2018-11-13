import CompassConfig from "../CompassConfig";
import Helpers from "../../services/Helpers";
import DataLayer from "../../services/DataLayer";
import CitiesPriority from '../../services/CitiesPriority'; /*[WUNBRAVIVOEMKT-13]*/
import Regionalization from "../../services/Regionalization";
import QueryStringHandler from '../../components/QueryStringHandler';
import BannerConversao from "../../components/BannerConversao";
import Compass from "../../components/Compass";


let locatedByGeoIp = false;
let getcookie_cidade, getcookie_ddd, getcookie_estado;
let cookie_estado, cookie_cidade, cookie_ddd, cookie_recomendation, autoCompleteCity, uf, ddd, cidade;
let statusGeoIP;
let positonLabel = true;
let cityChosedByRecomendation = false;
let __this;

class Functions {
    constructor() {
        __this = this;
        this.helpers = new Helpers();
        this.cities = require('../../services/CityList.js');
        this.bussolaMainSelector = '#vvpcnvgbuss';
        this.compassConfig = new CompassConfig(this.bussolaMainSelector);
        this.sectionsOffset = (this.helpers.isMobile()) ? 120 : 60;
        this.compass;

        this.initDefaultContent();
        this.datalayer = new DataLayer();

        if( !window.functionsIsInit ){
            $('.btn-confirmar').on('click', () => {
                
                let inputBussolaValue = $("#autocomplete").val();
                if( inputBussolaValue ){
                    this.setCurrentCity( inputBussolaValue );
                    $('.ciudad').find('p').text(inputBussolaValue);
                    let getcookie_cidade;
                    let getcookie_ddd;
                    let getcookie_estado;
                    this.getcookie_cidade = getcookie_cidade = decodeURI( this.helpers.getCookie('controle_cidade'));
                    this.getcookie_ddd = getcookie_ddd = this.helpers.getCookie('controle_ddd');
                    this.getcookie_estado = getcookie_estado = this.helpers.getCookie('controle_estado');
                    this.datalayer.sendDataLayerLocation('select-city-compass', getcookie_estado, getcookie_cidade, getcookie_ddd); 
                }
            });
        }

        window.functionsIsInit = true;
    }

    MobileOpenModal(_this) {
        var _this = _this || this;
        //    $('.comp_0002_banner_param').css('margin-top', '60px');
        var step = $('.wrapper').css('display');

        $('.bussola_onmodal_input').show();
        $('.label .wrapper').hide();
        $('.label').css('height', '64px');
        $(".bussola_onmodal_input").appendTo(".label");
        $('#autocomplete_input').focus(() => {
            openModal();
        });

        var openModal = () => {
            $(".plans__title").show();
            _this.compassConfig.moveTo(".bussola_onmodal");
            _this.setTemplateBussola('click', getcookie_estado, getcookie_cidade, getcookie_ddd)
            _this.setMobileBussola()
            $(_this.bussolaMainSelector + ' #autocomplete').val('').focus();
            $("#autocomplete").click();
        }
    }

    initCompass() {
        var _this = this;
        this.maxRecomendationsLength = 4;

        var returnParameterShop = window.location.search.split('=')[1];
        this.returnFromShop(returnParameterShop);

        this.getcookie_cidade = getcookie_cidade = decodeURI( this.helpers.getCookie('controle_cidade'));
        this.getcookie_ddd = getcookie_ddd = this.helpers.getCookie('controle_ddd');
        this.getcookie_estado = getcookie_estado = this.helpers.getCookie('controle_estado');

        if( getcookie_ddd == "" || getcookie_cidade == "" || getcookie_estado == "" ){
            window.hasLocationCookies = false;
        }else{
            window.hasLocationCookies = true;
        }

        this.queryStringHandler = new QueryStringHandler();
        this.queryStringHandler.relocateContent();

        // CHECK CIDADE URL PARAM
        let urlParamCidade = this.helpers.getUrlParameter("cidade");
        let urlParamFluxo = this.helpers.getUrlParameter("fluxo"); 
        if( urlParamCidade || urlParamFluxo ){
            this.compassConfig.moveTo(".bussola_onpage");
            this.compass = new Compass( this.geolocationCallback , urlParamCidade, true );
            this.compassConfig.initFooterOn("#plans_cards", ".comp_0010_footer", this.sectionsOffset);
        } //CHECK COOKIE:
        else if (getcookie_ddd == "" || getcookie_cidade == "" || getcookie_estado == "") {
            this.checkLocationByGeoIP();
        } else {
            this.checkLocationByCookies();
        }

        //add listener click on location button in mobile menu
        $('.mobile-ciudad').on('click', () => {
            $(window).trigger( "CHANGE_LOCATION" );
        });

        $(window).resize(function () {
            // _this.setLabelCity();
            _this.getWindowSize();
        });

        this.helpers.getMobileOperatingSystem();

        var _self = this;

        $('#btnbackbuss, .label, .nova_bussola-actions__btn--confira').on('click', this.MobileOpenModal);

        if ($(window).width() < 768) {
            $(this.bussolaMainSelector + " #autocomplete").focus(function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 300)
            });

            $(this.bussolaMainSelector + " #autocomplete").focusout(() => {
                $('html, body').animate({
                    scrollTop: 0
                }, 300)

                if ($(window).width() < 768) {
                    $(this.bussolaMainSelector + ' .container').removeClass('mobile');

                    if ($(this.bussolaMainSelector + ' .container').hasClass('android')) {
                        $(this.bussolaMainSelector + ' .container').removeClass('android');
                    }
                }
            });
            $(this.bussolaMainSelector + ' #autocomplete').appendTo(".awesomplete ul");
            $(this.bussolaMainSelector + ' #autocomplete').on('click', function (e) {
                e.preventDefault()
                _this.setMobileBussola()
            })


        }

        $(this.bussolaMainSelector + ' .btn-fechar, .overlay').on('click', function (e) {
            if (getcookie_cidade != '') {
                _this.hideCompass(null, 'fechouBussola', locatedByGeoIp, getcookie_cidade, getcookie_estado, getcookie_ddd, false, false, true)
            } else {
                _this.setErroBussola();
            }
        });

        $(this.bussolaMainSelector + " #autocomplete").keydown(function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                e.stopPropagation();
                if (!window.citySelected) {
                    _this.setErroBussola();

                    if ($(this).val() != '') {
                        $(_this.bussolaMainSelector + ' .error-select').show()
                    }
                }
            }
        });

        $(this.bussolaMainSelector + " #formBussola").on('submit', function (e) {
            e.preventDefault();
        });

        $(this.bussolaMainSelector + ' #submit').on('click', (e) => {
            e.preventDefault()
            this.cityChosedByRecomendation = true;
            cityChosedByRecomendation = true;
            var estado = $(e.currentTarget).attr('data-estado');
            var cidade = $(e.currentTarget).attr('data-cidade');
            var ddd = $(e.currentTarget).attr('data-ddd');
            // console.log("setCookie 180 functions.js");
            this.setCookie(estado, cidade, ddd);
            _this.sendDataCityToDB(cidade)
            window.citySelected = true;

        });

        // this.setLabelCity();
    }

    checkLocationByCookies(){
        let _this = this;
        if( window.hasLocationCookies ){
            let cidadeLocalizada = getcookie_cidade + ' - ' + getcookie_estado;
            $('#city-mob').text( cidadeLocalizada );
            $('.ciudad').find('p').text(cidadeLocalizada);
            $('.mobile-ciudad').find('p').text(cidadeLocalizada);
            $('.mobile-ciudad').css("display", "flex");
            $(".plans__title").show();
            $(".label").removeClass("label--hidden");
            $("[id^='livechat']").show();
            $('#btnbackbuss').show();
            _this.searchDataCity('cookie-success', getcookie_cidade);

            window.citySelected = true;
            var timeout = setInterval(function () {
                if (window.GAParam) {
                    clearInterval(timeout);
                    _this.getWindowSize();
                }
            }, 500);
        }else{
            _this.checkLocationByGeoIP();
        }
    }

    checkLocationByGeoIP(){
        this.compassConfig.moveTo(".bussola_onpage");
        if( !this.compass ){
            this.compass = new Compass();
            this.compassConfig.initFooterOn("#plans_cards", ".comp_0010_footer", this.sectionsOffset);
        }
        this.compass.regionalizaGeoIP( this.geolocationCallback );  
    }

    initDefaultContent(){
        this.urlParam = this.helpers.getUrlParameter("cards");
        this.banner;
        if(this.param == ''){
            this.banner = new BannerConversao( $('.container_banner') );
            this.banner.setupTemplate();
        }
        $('[data-target="franquia"]').remove();
    }

    geolocationCallback( value, location, checkCookies ){
        if( checkCookies ){
            __this.checkLocationByCookies();
        }else{
            if(value){
                let ciudad = location.ciudad.split("-")[0];
                ciudad = ciudad.substr( 0 , ciudad.length-1 );
            }
        }
    }

    setTemplateBussola(origin, estado, cidade, ddd) {
        if (origin == 'cookie-success' || origin == 'geoip-success' || origin == 'geolocation-success') {
            $(this.bussolaMainSelector + " #formBussola").addClass('confirm');
            $(this.bussolaMainSelector + " #autocomplete").attr(cidade);
            var cidadeToShow = (this.helpers.isDesktop()) ? cidade.replace(/ /g, "") : cidade;
            $(this.bussolaMainSelector + " .bussola_subtitle-info--city").text(cidadeToShow);
            $(this.bussolaMainSelector + ' #submit').css('display', 'block').attr({
                'data-estado': estado,
                'data-cidade': cidade,
                'data-ddd': ddd
            })

            $(this.bussolaMainSelector + ' .confirm #autocomplete').on('click', (e) => {
                e.preventDefault();
                $(this.bussolaMainSelector + ' .bussola_autocomplete-icon').removeClass('bussola_autocomplete-icon--close');
                $(this.bussolaMainSelector + " #autocomplete").val('');
                $(this.bussolaMainSelector + " #submit").hide();
                $(this.bussolaMainSelector + " #formBussola").removeClass('confirm');

            });
        } else {
            $(this.bussolaMainSelector + " #formBussola").removeClass('confirm');
            $(this.bussolaMainSelector + " #submit").hide();
            this.showCompass('click', locatedByGeoIp, estado, cidade, ddd, true, false, false);

        }
    }

    showCompass(event, locatedByGeoIp, estado, cidade, ddd, exibiuBussola, selecionouCidade, escapouBussola) {
        $(this.bussolaMainSelector).fadeIn(100);
    }

    hideCompass(origin, event, locatedByGeoIp, estado, cidade, ddd, exibiuBussola, selecionouCidade, escapouBussola) {
        let offset = $("#planos").offset().top - 45;
        this.helpers.controllScroll('unlock');

        if (!(this.getcookie_ddd == "" || this.getcookie_cidade == "" || this.getcookie_estado == "")) {
            $(this.bussolaMainSelector).hide();
        }
        if (origin === "dontsave") {
            return;
        } else if (origin === "dontsave-n-fadeout") {
            this.compassConfig.moveTo(".bussola_onpage");
            return;
        }

        $(this.bussolaMainSelector).fadeOut(100);
        $(".label").removeClass("label--hidden");
        $(".plans__title").show();
        $('.bussola_onpage').hide();
        $('#btnbackbuss').show();
        window.isSlickCardsInit = false;
        this.animScrollTo(offset);
        this.compassConfig.initFooterOn(false);
    }

    checkMaxRecomendations() {
        return $(this.bussolaMainSelector + " .bussola_recomendations-container").children().length < this.maxRecomendationsLength;
    }

    configAutocomplete() {
        var _this = this;

        var _formatRegexp = function (q) {
            q = q.replace(/[eéèêëEÉÈÊË]/gi, '[eéèêëEÉÈÊË]');
            q = q.replace(/[aàáãâäAÀÁÂÃÄÅÆ]/gi, '[aàáãâäAÀÁÂÃÄÅÆ]');
            q = q.replace(/[cçC]/gi, '[cçC]');
            q = q.replace(/[iíìïîIÌÍÎÏ]/gi, '[iíìïîIÌÍÎÏ]');
            q = q.replace(/[oóòôöÒÓÔÕÖ]/gi, '[oóòôöÒÓÔÕÖ]');
            q = q.replace(/[uúùüûUÜÛÙÚ]/gi, '[uúùüûUÜÛÙÚ]');
            q = q.replace(/[yYÿÝ]/gi, '[yYÿÝ]');
            return q;
        };

        /*[WUNBRAVIVOEMKT-13]*/

        /**
         * Flags to search by state
         */
        this.searchByState = false;
        this.unfilteredByStates = false;
        this.needToRefreshSuggestions = false;
        this.filteredByStates = [];
        this.citiesPriority = (new CitiesPriority()).cidades.reverse();
        this.citiesPriorityUnreversed = (new CitiesPriority()).cidades;
        this._bussolaRecomendations = $(this.bussolaMainSelector + ' #formBussola .bussola_recomendations-container');
        this._regionModal = $(this.bussolaMainSelector + " .nova_bussola_regiao_modal");
        this._awesompletePreUl = '.awesomplete--pre-ul';
        this.cityChosedByRecomendation = false;


        var _inputComplete = $(this.bussolaMainSelector + " #autocomplete")[0];

        var _maxItems = (this.helpers.isMobile()) ? 5 : 10;

        this.awesomplete = new Awesomplete(_inputComplete, {
            minChars: 2,
            autoFirst: true,
            item: (text, input) => {
                if (!this.needToRefreshSuggestions) {
                    this.needToRefreshSuggestions = true;
                    this._bussolaRecomendations.html("");
                }
                if (this.checkMaxRecomendations()) {
                    let item = $(Awesomplete.ITEM(text, text.label.toLowerCase().match(_formatRegexp(input).toLowerCase())[0]));
                    item.addClass("bussola_recomendations-container--item");
                    item.on("click", (e) => {
                        var id = $(e.target).text();
                        this.setCurrentCity(id);
                    });
                    this._bussolaRecomendations.append(item);
                }
                return Awesomplete.ITEM(text, text.label.toLowerCase().match(_formatRegexp(input).toLowerCase())[0]); // highlighted item matched by [eéèêëEÉÈÊË] regex    
            },
            sort: (a, b) => {
                var a_priority = -1,
                    b_priority = -1;
                /**
                 * Sort by priority (Setted on CitiesPriority.js)
                 */
                this.citiesPriority.map(function (cidade, key) {
                    if (cidade === a.value && a_priority === -1) {
                        a_priority = key;
                    }
                    if (cidade === b.value && b_priority === -1) {
                        b_priority = key;
                        // return a < b;
                    }
                });
                if (a_priority < b_priority) {
                    return 1;
                } else if (a_priority == b_priority) {
                    var reg = new RegExp("^(" + _formatRegexp(_inputComplete.value).toLowerCase() + ")", "i");
                    if (reg.test(b.label)) {
                        return 1;
                    }
                    return -1;
                } else if (a_priority > b_priority) {
                    return -1;
                }

                // return (a_priority) < (b_priority);
            },
            filter: (data, input) => {
                /**
                 * States results comes first, cities results comes last:
                 */
                if (!this.searchByState) { // If is first run of the filter
                    this.filteredByStates = [];
                    this.cities.cidades.map((cidade) => { // Create an array with all cities of founded state
                        this.searchByState = true;
                        if (_formatRegexp(input).toLowerCase() == _formatRegexp(cidade.value.split(" - ")[1]).toLowerCase()) { // Ex: - SP | - GO
                            this.unfilteredByStates = true; // Prioritizes states
                            this.filteredByStates.push(cidade.value);
                        }
                    });
                }


                if (this.filteredByStates.indexOf(data.label) > -1) { // If found by state:
                    return true;
                }
                if (!this.unfilteredByStates) { // If not found by state:
                    return _formatRegexp(data).toLowerCase().indexOf(_formatRegexp(input).toLowerCase()) > -1;
                }


            }
        });

        var bussolaModalMobile = () => {
            if (this.helpers.isMobile() || this.helpers.isTablet()) {
                $(".plans__title").show();
                this.compassConfig.moveTo(".bussola_onmodal");
                this.showCompass('abriuBussola', locatedByGeoIp, null, null, null, true, false, false);
                $(this.bussolaMainSelector + ' #autocomplete').off("focus", bussolaModalMobile)
                $(_inputComplete).trigger("click").focus();
            }
        }

        $(this.bussolaMainSelector + ' .bussola_autocomplete-icon').click((e) => {
            $(_inputComplete).val("");
            $(_inputComplete).trigger("click").focus();
            $(this.bussolaMainSelector + ' .bussola_autocomplete-icon').removeClass('bussola_autocomplete-icon--close');
        })
        $(this.bussolaMainSelector + ' .bussola_autocomplete-icon--back').click((e) => {
            $(_inputComplete).val("");
            $(this.awesomplete.ul).html("");
            $(this.bussolaMainSelector + ' .bussola_autocomplete-icon').removeClass('bussola_autocomplete-icon--close');
            $(this.bussolaMainSelector + ' .container.mobile').removeClass('mobile');
            this.hideCompass("dontsave");
            $(".plans__title").hide();
            this.compassConfig.moveTo(".bussola_onpage");
            $("#autocomplete").on("focus", bussolaModalMobile);
        })

        this.setDefaultRecomendations();
        this.cities = require('../../services/CityList.js');
        var listComplete = [];
        $.each(this.cities.cidades, function (key, item) {
            listComplete.push(item.value);
        });
    
        this.awesomplete.list = listComplete;

        $(this.bussolaMainSelector + " .nova_bussola_regiao_modal-bg, .nova_bussola_regiao_modal > .hw-wrapper, .nova_bussola_regiao_modal-content-btn-ok").on("click", () => {
            this.helpers.controllScroll('unlock');
            this._regionModal.hide();
        });
        $(_inputComplete).on("awesomplete-open", () => {
            this.showAwesompletePreUl();
        });
        $(_inputComplete).on("awesomplete-close", () => {
            if (!this.awesomplete.suggestions || this.awesomplete.suggestions.length < 1) {
                this.showAwesompletePreUl();
                return;
            }
            this.hideAwesompletePreUl();
        });
        $(_inputComplete).on("awesomplete-highlight", () => {
            // Reset search
            this.searchByState = false;
            this.unfilteredByStates = false;
        });

        $("#autocomplete").on("focus", bussolaModalMobile);

        $(_inputComplete).on("click", () => {
            this.setDefaultRecomendations();
            this.setDefaultRecomendationsMobileOnly();
            this.hideCitiesSelectOnDesktop();
            this.showAwesompletePreUl();
            this.createDefaultRecomendations();
        });
        if (this.helpers.isMobile() || this.helpers.isTablet()) {
            $(_inputComplete).off("focusout");
        }
        $(_inputComplete).on("blur", () => {
            this._bussolaRecomendations.parent().css("visibility", "visible");
            this.hideAwesompletePreUl();
            $(this.awesomplete.ul).attr("hidden", "");
        });
        $(_inputComplete).on("input", () => {
            this.needToRefreshSuggestions = false;
            // If no suggestions
            var suggestions = this.awesomplete.suggestions,
                _inputCompleteLength = $(_inputComplete).val().length;
            this._bussolaRecomendations.parent().css("visibility", "visible");
            if (_inputCompleteLength >= 2) {
                this._bussolaRecomendations.parent().css("visibility", "hidden");
                if (!suggestions || suggestions.length < 1) {
                    $(this.awesomplete.ul).removeAttr("hidden");
                    this.showAwesompletePreUl();
                    $(this.awesomplete.ul).html($(Awesomplete.ITEM('Ops! Não encontramos essa cidade. <br class="only-mobile"/> Tente digitar de novo.', ""))
                        .addClass("bussola_noresults"));
                }
            } else if (_inputCompleteLength < 2) {
                this.hideAwesompletePreUl();
                $(this.awesomplete.ul).attr("hidden", "");
                if (_inputCompleteLength == 0) {
                    this.hideCitiesSelectOnDesktop();
                    this.setDefaultRecomendations();
                }
                this.setDefaultRecomendationsMobileOnly();
            } else {
                $(this.awesomplete.ul).html("");
            }
            //toggle icon search:            
            if (_inputCompleteLength > 0) {
                $(this.bussolaMainSelector + ' .bussola_autocomplete-icon').addClass('bussola_autocomplete-icon--close');
            } else {
                $(this.bussolaMainSelector + ' .bussola_autocomplete-icon').removeClass('bussola_autocomplete-icon--close');
            }

        });


        //Decoration select desktop:
        $(this.awesomplete.ul).parent().append('<div class="' + this._awesompletePreUl.replace(".", "") + '" hidden=""></div>');

        window.addEventListener("awesomplete-select", (e) => {
            $(this.bussolaMainSelector + ' .error-select').hide();
        });

        $('#autocomplete').bind("awesomplete-selectcomplete", (e) => {
            this.setCurrentCity(e.text.label);
        }, false);


    }

    /**
     * Hide awesomplete suggestions:
     */
    hideCitiesSelectOnDesktop() {
        if (!this.helpers.isDesktop()) {
            $(this.awesomplete.ul).attr("hidden", "");
        }
    }
    /**
     * ul background (desktop)
     */
    showAwesompletePreUl() {
        setTimeout(() => {
            var ulHeight = $(this.awesomplete.ul).outerHeight();
            $(this._awesompletePreUl).css("height", (ulHeight + 95) + "px").removeAttr("hidden");
            $(".bussola_onpage " + this._awesompletePreUl).css("height", (ulHeight + 75) + "px");
        });
    }

    hideAwesompletePreUl() {
        $(this._awesompletePreUl).attr("hidden", "");
    }

    animScrollTo(el, speed) {
        var elTop = (!isNaN(el)) ? el : $(el).offset().top;
        var speed = (speed !== undefined) ? speed : 600;
        $("html, body").animate({
            scrollTop: elTop - this.sectionsOffset
        }, speed);
    }

    setCurrentCity(cityLabel) {
        $('#autocomplete_input').val('');
        var estado, cidade, ddd;
        var id = this.cities.cidades.find((element, index) => {
            if (element.value == cityLabel) {
                estado = element.data;
                cidade = element.value;
                ddd = element.ddd;
                return index;
            }
        });
        // document.activeElement.blur();

        if ($(window).width() < 1025 && $(this.bussolaMainSelector + ' .controle__header__nav').css('display') == 'block') {
            $('.controle__header__nav').hide();
            $('#bt-menu-mob').removeClass('open');
        }

        if (!window.citySelected) {
            this.sendDataCityToDB(cidade);
        }
        this.setCookie(estado, cidade, ddd);
        window.citySelected = true;

    }

    /**
     * Set recomendations according CitiesPriority.js
     */
    setDefaultRecomendations() {
        /**
         * Set recomendations on load:
         */
        this._bussolaRecomendations.html("");
        var i = 0;
        while (i < this.maxRecomendationsLength) {
            if (this.citiesPriorityUnreversed[i]) {
                let item = $(Awesomplete.ITEM(this.citiesPriorityUnreversed[i], ""));
                this._bussolaRecomendations.append(item);
                item.addClass("bussola_recomendations-container--item");
                item.on("click", (e) => {
                    // this.cityChosedByRecomendation = true;
                    console.log("c");
                    this.setCurrentCity($(e.target).text());
                });
            }
            i++;
        }
    }

    createDefaultRecomendations() {
        $(this.awesomplete.ul).html("");
        this.awesomplete.suggestions = [];
        var i = 0;
        for (var city in this.citiesPriorityUnreversed) {
            if (i < ((this.helpers.isMobile()) ? 5 : 4)) {
                $(this.awesomplete.ul).removeAttr("hidden");
                $(this.awesomplete.ul).append($(Awesomplete.ITEM(this.citiesPriorityUnreversed[city], "")).on("click", (e) => {
                    // this.cityChosedByRecomendation = true;
                    this.setCurrentCity($(e.target).text());
                }));
                this.awesomplete.suggestions.push({
                    label: this.citiesPriorityUnreversed[city],
                    value: this.citiesPriorityUnreversed[city]
                });
            }
            i++;
        }
    }

    //Recomendations Mobile Only:
    setDefaultRecomendationsMobileOnly() {
        if (this.helpers.isMobile() || this.helpers.isTablet()) {
            this.createDefaultRecomendations();
        }
    }



    /*[WUNBRAVIVOEMKT-13]*/


    setMobileBussola() {
        if (!$(this.bussolaMainSelector + ' #formbussola').hasClass('confirm')) {
            if ($(window).width() < 768) {
                $(this.bussolaMainSelector + ' .container').addClass('mobile');

                if (/android/i.test(navigator.userAgent)) {
                    $(this.bussolaMainSelector + ' .container').addClass('android');
                }
            }
        }
    }

    setCookie(estado, cidade, ddd) {
        cookie_estado = "controle_estado=" + estado + ";path=/";
        if( cidade.indexOf("-") > -1 ){
            cookie_cidade = "controle_cidade=" + encodeURI(cidade.split(' - ')[0]) + ";path=/";
        }else{
            cookie_cidade = "controle_cidade=" + encodeURI(cidade) + ";path=/";
        }
        cookie_ddd = "controle_ddd=" + ddd + ";path=/";
        cookie_recomendation = "controle_recomendation=" + ((this.cityChosedByRecomendation) ? "1" : "0") + ";path=/";

        document.cookie = cookie_estado;
        document.cookie = cookie_cidade;
        document.cookie = cookie_ddd;
        document.cookie = cookie_recomendation;

        this.initRegionalization(estado, cidade, ddd);

        if (window.location.search.split('=')[1] == 'mudarcidade') {
            this.hideCompass('returnShop', 'selecionouCidade', locatedByGeoIp, estado, cidade, ddd, false, true, true);
        } else {
            this.hideCompass(null, 'selecionouCidade', locatedByGeoIp, estado, cidade, ddd, false, true, true);
        }
    }

    getWindowSize() {
        var w = $(window).width();

        if (w < 640) {
            $(this.bussolaMainSelector + " .plans").addClass("isMobile");

        } else {
            $(this.bussolaMainSelector + " .plans").removeClass("isMobile");
        }
    }

    sendDataCityToDB(city) {
        var city = city.toString()
        $.ajax({
            url: 'https://sslplataformavivow.clientes.ananke.com.br/vgeolocal/api/geolocation/GravarIpCidade?cidade=' + city,
            type: "post",
            dataType: "text",
            success: function (data) {
                console.log('Dados enviados');
            },
            error: function (error) {
                console.error('Error occurred. Error code: ' + error.code);
            }
        });
    }

    regionalizaGeoIP() {
        var urlGeoip = 'https://sslplataformavivow.clientes.ananke.com.br/vgeolocal/api/geolocation';

        $('#ciudad').find('p').text('Localizando...');

        var _this = this;

        $.ajax({
            url: urlGeoip,
            type: "post",
            dataType: "json",
            timeout: 4000,
            success: function (data) {
                // data.City = "Araras";
                if (data.City != '') {
                    locatedByGeoIp = true;
                    _this.searchDataCity('geoip-success', data.City);
                    $(_this.bussolaMainSelector + ' .bussola_autocomplete-icon').addClass('bussola_autocomplete-icon--close');
                } else {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((p) => {
                            _this.geolocationPosition(p)
                        }, function (error) {
                            _this.showCompass('abriuBussola', locatedByGeoIp, null, null, null, true, false, false)
                        }, {
                            timeout: 2000
                        });
                    } else {
                        _this.showCompass('abriuBussola', false, null, null, null, true, false, false);
                    }
                }
            },
            error: function (error) {
                console.error('Error occurred. Error code: ' + error.code);
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((p) => {
                        _this.geolocationPosition(p)
                    }, function (error) {
                        _this.showCompass('abriuBussola', locatedByGeoIp, null, null, null, true, false, false)
                    }, {
                        timeout: 2000
                    });
                } else {
                    _this.showCompass();
                }
            }
        });
    }

    geolocationPosition(currentPosition) {
        var _this = this;
        var lat = currentPosition.coords.latitude;
        var lng = currentPosition.coords.longitude;
        var key = 'gme-telefonicabrasil1';
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='

        $.ajax({
            url: url + lat + ',' + lng + '&Key' + key,
            type: "get",
            dataType: "json",
            success: function (data) {

                try {
                    var results = data.results;
                    for (i = 0; i < results.length; i++) {
                        var types = results[i].types
                        for (j = 0; j < types.length; j++) {
                            if (types[j] == 'locality') {
                                _this.searchDataCity('geolocation-success', results[i].address_components[0].long_name);
                                locatedByGeoIp = true;
                                break;
                            }
                        }
                    }
                } catch (e) {
                    _this.showCompass('abriuBussola', locatedByGeoIp, null, null, null, true, false, false)
                }
            },
            error: function (data) {
                _this.showCompass('abriuBussola', locatedByGeoIp, null, null, null, true, false, false)
            }
        })
    }

    searchDataCity(origin, city) {
        var _this = this;
        var cities = require('../../services/CityList.js').cidades;

        for (var i = 0; i < cities.length; i++) {
            var autoCompleteCity = cities[i].value;

            if (autoCompleteCity.indexOf(city) != -1 && autoCompleteCity.length == city.length + 5) {
                var uf = cities[i].data;
                var ddd = cities[i].ddd;
                var cidade = cities[i].value;
                _this.initRegionalization(uf, cidade, ddd);
                _this.setTemplateBussola(origin, uf, cidade, ddd);
            }
        }
    }

    returnFromShop(parameter) {
        if (parameter == 'mudarcidade') {
            this.showCompass('abriuBussola', locatedByGeoIp, null, null, null, true, false, false);
        }
    }

    setLabelCity() {
        //Also set region modal:
        var paddingSection = 30;
        var label = $('.label');
        var menuHeight = $('.comp_0001_header_control').css('height').split('px')[0];
        var labelheight = label.css('height').split('px')[0];
        if (positonLabel) {
            if ($(window).width() >= 1024) {
                label.hide()
            }
        }

        positonLabel = false;
    }


    initRegionalization(estado, cidade, ddd) {
        $('.container-planos .container-box').remove();
        $('.container_modal').remove();
        if (this.helpers.isMobile() || this.helpers.isTablet()) {
            $('.ofertas-pra').show();
            $('.modal-locations').hide();
            $('.bussola_onmodal_input').hide();
            $('#city-mob').text(cidade);
            $('.mobile-ciudad').find('p').text(cidade + '-' + estado);
            $('.mobile-ciudad').css('display', 'flex');
        }

        $('#currentCity').text(cidade + " :S");
        $('.label__text').text(cidade).show();
        $('.plans-carousel-mob').empty();
        $('.plans-carousel-mob').removeClass('slick-initialized');
        $('#autocomplete_input').attr('placeholder', cidade);
        $('.bussola_onmodal_input').hide();
        $('.wrapper').show();
        $('.label').css('height', '30px');
        $('.bussola_onmodal_input', '.bussola_link').hide();
        $('#btn_cidade').show();
        $('.label').on('click', this.MobileOpenModal);

        /*if ($(this.bussolaMainSelector + ' .plans-carousel-mob').hasClass('slick-initialized')) {
            $(this.bussolaMainSelector + ' .plans-carousel-mob').slick('unslick');
        }*/

        // window.enableMobileChat();
        // remover o item do guru caso esteja nas regionais do ne
        var svaGuru = $(".swiper-wrapper .card:nth-child(2)");

        var regions = require('../../fill/regions.js').regions;

        if (jQuery.inArray(parseInt( this.helpers.getCookie('controle_ddd')), regions.ne) != -1) {
            svaGuru.css('display', 'none');
        } else {
            svaGuru.css('display', 'block');
        }

        new Regionalization();

    }

    getGA() {
        var paramGA = (window.ga && ga.create);

        if (paramGA) {
            ga('require', 'linker');

            window.GAParam = "&" + ga.getAll()[0].get("linkerParam");
        }
    }
}

export default Functions;

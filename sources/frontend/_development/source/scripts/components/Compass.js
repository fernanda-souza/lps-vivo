import CompassConfig from "./CompassConfig";
import Helpers from "../services/Helpers";
import DataLayer from "../services/DataLayer";
import CitiesPriority from '../services/CitiesPriority'; /*[WUNBRAVIVOEMKT-13]*/
import Regionalization from "../services/Regionalization";
import SharedFunctions from "./shared/functions";

let locatedByGeoIp = false;
let getcookie_cidade, getcookie_ddd, getcookie_estado;
let cookie_estado, cookie_cidade, cookie_ddd, cookie_recomendation, autoCompleteCity, uf, ddd, cidade;
let statusGeoIP;
let positonLabel = true;
let cityChosedByRecomendation = false;

class Compass {
    constructor( $callback , $cidade, $queryString = false ) {
        this.bussolaSelector = '.container_modal';
        this.bussolaMainSelector = '.modal_content';
        this.queryString = $queryString;
        this.compassConfig = new CompassConfig(this.bussolaMainSelector);
        this.helpers = new Helpers();
        this.SharedFunctions = new SharedFunctions();
        this.datalayer = new DataLayer();
        this.configAutocomplete();
        this.sectionsOffset = (this.helpers.isMobile()) ? 120 : 60;  
        $('.bussola_loading').hide();
        $(".bussola_hideonloading").removeClass("bussola_hideonloading");
        this.verificaRegionalChat();
        this.openModal();
        this.closeModal();
        this.openChat();
        $('.container-planos .container-box');

        if( $cidade ) {
            this.processGeolocationData( $callback, $cidade );
        }
    }

    openModal() {
        let openModal = $(".section__wrapper");
        openModal.show();
        openModal.delegate(".btnnull", "click", function(e) {
            e.preventDefault();

            $("#modalChatvivi").fadeIn();
        });
    }

    closeModal() {
        let closeModal = $(".btn-fechar");
        closeModal.click(function(e) {
            e.preventDefault();
            $("#modalChatvivi").fadeOut();
        });
    }

    openChat() {
        let openChat = $("#box-btn_right3");
        openChat.click(function(e) {
            e.preventDefault();
            $("#modalChatvivi").fadeOut("slow", function(e) {
                $("#web").trigger("click");
            });
        });
    }

    verificaRegionalChat() {
        this.helpers = new Helpers();
        var getCookieDDD = this.helpers.getCookie("controle_ddd");
        //var regionSul = [41, 42, 43, 44, 45, 46,47, 48, 49, 51, 53, 54, 55]
        var dddRio = [21, 22, 24];
        // $("#livechat-full, #livechat-eye-catcher, #livechat-compact-container").hide();

        // if (dddRio.indexOf(parseInt(getCookieDDD)) != -1) {
            
            // $("#livechat-full, #livechat-eye-catcher, #livechat-compact-container").hide();
            
            this.openModal();
            this.closeModal();
            this.openChat();

            var viviShowerLogic = { active: true, percent: 100 };

            // if ($(window).width() < 426) {
            //     $('#triggerAssistant').show();
            //     $(".btnnull").hide();
            // } else {
            //     $('#triggerAssistant').hide();
            //     $(".btnnull").show();
            // }

        // } else {
            // $("#livechat-eye-catcher, #livechat-compact-container, #livechat-full").show();
            // $(".btnnull,#triggerAssistant").hide();
        
            // var lc = document.createElement("script");
            // lc.type = "text/javascript";
            // lc.async = true;
            // lc.src =
            //     ("https:" == document.location.protocol
            //         ? "https://"
            //         : "http://") + "cdn.livechatinc.com/tracking.js";
            // var s = document.getElementsByTagName("script")[0];
            // s.parentNode.insertBefore(lc, s);
        // }
    }

    setTemplateBussola(origin, estado, cidade, ddd) {
        // $(".nova_bussola .icon-close").on("click", () => {
        //     this.hideCompass('dontsave-n-fadeout');
        // });
        if (cidade == "São Paulo - SP") {
            var cidadeToShow = "São Paulo";
            $('#autocomplete').attr('placeholder', cidadeToShow);
        }
        if (origin == 'cookie-success' || origin == 'geoip-success' || origin == 'geolocation-success') {
            $(this.bussolaMainSelector + " #formBussola").addClass('confirm');
            $(this.bussolaMainSelector + " #autocomplete").attr(cidade);
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
            // this.showCompass('abriuBussola', locatedByGeoIp, estado, cidade, ddd, true, false, false);
        } else {
            $(this.bussolaMainSelector + " #formBussola").removeClass('confirm');
            $(this.bussolaMainSelector + " #submit").hide();
            // window.location.href="./a/";
            this.showCompass('click', locatedByGeoIp, estado, cidade, ddd, true, false, false);
    
        }
    }

    showCompass(event, locatedByGeoIp, estado, cidade, ddd, exibiuBussola, selecionouCidade, escapouBussola) {
        $(this.bussolaMainSelector).fadeIn(100);
        this.datalayer.sendDataBussola('show-compass', estado, cidade, ddd);
    }

    hideCompass(origin, event, locatedByGeoIp, estado, cidade, ddd, exibiuBussola, selecionouCidade, escapouBussola) {

        var offset;
        if (origin == 'returnShop') {
            offset = $(this.bussolaMainSelector + " .plans-section").offset().top;
        } else {
            offset = 0;
        }
        var helpers = new Helpers();
        helpers.controllScroll('unlock');

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
        this.compassConfig.initFooterOn(false);
    }

    checkMaxRecomendations(){
        return $(this.bussolaMainSelector + " .bussola_recomendations-container").children().length < this.maxRecomendationsLength;
    }

    configAutocomplete() {
        var _this = this;
        
        var _formatRegexp = function(q) {
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
        
        var _maxItems = ( this.helpers.isMobile() )? 5 : 10;

        if( !window.bussolaIsInit ){
            this.awesomplete = new Awesomplete(_inputComplete, {
                minChars: 2,
                autoFirst: true,
                maxItems : _maxItems,
                item: (text, input) => {
                    // suggestions
                    if (!this.needToRefreshSuggestions) {
                        this.needToRefreshSuggestions = true; this._bussolaRecomendations.html("");
                    }
                    if (this.checkMaxRecomendations()){
                        let item = $(Awesomplete.ITEM( text, text.label.toLowerCase().match(_formatRegexp(input).toLowerCase())[0] ));
                            item.addClass("bussola_recomendations-container--item");
                            item.on("click", (e) => {
                                
                                // this.cityChosedByRecomendation = true;
                                var id = $(e.target).text();
                                this.setCurrentCity(id);
                                console.log("2");
                            });
                            this._bussolaRecomendations.append( item );
                    }
                    // end suggestions
                    return Awesomplete.ITEM(text, text.label.toLowerCase().match(_formatRegexp(input).toLowerCase())[0]); // highlighted item matched by [eéèêëEÉÈÊË] regex    
                },
                sort: (a, b) => {
                    var a_priority = -1, b_priority = -1;
                    /**
                     * Sort by priority (Setted on CitiesPriority.js)
                     */
                    this.citiesPriority.map(function(cidade, key){
                        if (cidade === a.value && a_priority === -1) {
                            a_priority = key;
                        }
                        if (cidade === b.value && b_priority === -1) {
                            b_priority = key;
                            // return a < b;
                        } 
                    });
                    if( a_priority < b_priority ){
                        return 1;
                    }else if( a_priority == b_priority ){
                        var reg = new RegExp("^("+_formatRegexp(_inputComplete.value).toLowerCase()+")", "i");
                        if (reg.test(b.label)){
                            return 1;
                        }
                        return -1;
                    }else if( a_priority > b_priority ){
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
                        this.cities.cidades.map((cidade)=>{ // Create an array with all cities of founded state
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
            window.bussolaIsInit = true;

            // var _parent = $(this.bussolaMainSelector + " <div></div>");
        // $(this.bussolaMainSelector + " .awesomplete").append(_parent);
        // $(this.awesomplete.ul).appendTo(_parent);

        var bussolaModalMobile = () => {  
            if ( this.helpers.isMobile() || this.helpers.isTablet() ) {
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
        this.cities = require('../services/CityList.js');
        var listComplete = [ ];
        $.each(this.cities.cidades, function(key, item) {
            listComplete.push(item.value);
        });
        //this.awesomplete.list = listComplete.sort();
        // listComplete = listComplete.sort();
        if( this.awesomplete ){
            this.awesomplete.list = listComplete;
        }

        $(this.bussolaMainSelector + " .nova_bussola_regiao_modal-bg, .nova_bussola_regiao_modal > .hw-wrapper, .nova_bussola_regiao_modal-content-btn-ok").on("click", ()=> {
            (new Helpers()).controllScroll('unlock');
            this._regionModal.hide();
        });
        $(_inputComplete).on("awesomplete-open", ()=> {
            this.showAwesompletePreUl();
        });
        $(_inputComplete).on("awesomplete-close", ()=> {    
            if (!this.awesomplete.suggestions || this.awesomplete.suggestions.length < 1) {
                this.showAwesompletePreUl();
                return;
            }
            this.hideAwesompletePreUl();
        });
        $(_inputComplete).on("awesomplete-highlight", ()=> {
            // Reset search
            this.searchByState = false;
            this.unfilteredByStates = false;
        });

        $("#autocomplete").on("focus", bussolaModalMobile); 
                        
        $(_inputComplete).on("click", ()=> {
            window.citySelected = false;
            $("#triggerAssistant").hide();
            this.setDefaultRecomendations();
            this.setDefaultRecomendationsMobileOnly();
            this.hideCitiesSelectOnDesktop();
            this.showAwesompletePreUl();
            this.createDefaultRecomendations();
        });                 
        if ( this.helpers.isMobile() || this.helpers.isTablet() ) {
            $(_inputComplete).off("focusout");
        }
        $(_inputComplete).on("blur", ()=> {   
            this._bussolaRecomendations.parent().css("visibility", "visible");
            this.hideAwesompletePreUl();
            $(this.awesomplete.ul).attr("hidden", "");
            $("#triggerAssistant").show();
        });
        $(_inputComplete).on("input", ()=> {
            this.needToRefreshSuggestions = false;
            // If no suggestions
            var suggestions = this.awesomplete.suggestions, _inputCompleteLength = $(_inputComplete).val().length;
            this._bussolaRecomendations.parent().css("visibility", "visible");
            if (_inputCompleteLength >= 2){
                this._bussolaRecomendations.parent().css("visibility", "hidden");
                if (!suggestions || suggestions.length < 1) {
                    $(this.awesomplete.ul).removeAttr("hidden");
                    this.showAwesompletePreUl();
                    $(this.awesomplete.ul).html($(Awesomplete.ITEM('Ops! Não encontramos essa cidade. <br class="only-mobile"/> Tente digitar de novo.',""))
                    .addClass("bussola_noresults"));
                }
            } else if (_inputCompleteLength < 2){
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
            if (_inputCompleteLength > 0){
                $(this.bussolaMainSelector + ' .bussola_autocomplete-icon').addClass('bussola_autocomplete-icon--close');
            } else {
                $(this.bussolaMainSelector + ' .bussola_autocomplete-icon').removeClass('bussola_autocomplete-icon--close');
            }
            
        });

        
        //Decoration select desktop:
        $(this.awesomplete.ul).parent().append('<div class="'+this._awesompletePreUl.replace(".","")+'" hidden=""></div>');

        window.addEventListener("awesomplete-select", (e) => {
            $(this.bussolaMainSelector + ' .error-select').hide();
        });
    
        // window.addEventListener("awesomplete-selectcomplete", (e) => {
        //     this.setCurrentCity(e.text.label);
        // }, false);

        }
        
    }

    /**
     * Hide awesomplete suggestions:
     */
    hideCitiesSelectOnDesktop() {
        if (this.helpers.isDesktop()) {
            $(this.awesomplete.ul).attr("hidden", "");
        }
    }
    /**
     * ul background (desktop)
     */
    showAwesompletePreUl(){
        setTimeout(()=>{
            var ulHeight = $(this.awesomplete.ul).outerHeight();        
            // $(this._awesompletePreUl).css("height", (ulHeight + 95) + "px").removeAttr("hidden");
            // $(".bussola_onpage " + this._awesompletePreUl).css("height", (ulHeight + 75) + "px");
        });
    }

    hideAwesompletePreUl(){
        $(this._awesompletePreUl).attr("hidden", "");
    }

    animScrollTo(el, speed){
        var elTop = (!isNaN(el)) ? el : $(el).offset().top;
        var speed = (speed !== undefined) ? speed : 600;         
        $("html, body").animate({scrollTop: elTop - this.sectionsOffset}, speed);
    }

    setCurrentCity(cityLabel , preventHideBussola){
        $('#autocomplete_input').val('');
        var estado, cidade, ddd;
        var id = this.cities.cidades.filter((element,index)=>{
            if( element.value == cityLabel){
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
        this.setCookie(estado, cidade, ddd , preventHideBussola);
        window.citySelected = true;
        this.hideBussolaList();
    }

    /**
     * Set recomendations according CitiesPriority.js
     */
    setDefaultRecomendations(){            
        /**
         * Set recomendations on load:
         */
        this._bussolaRecomendations.html("");
        var i = 0; while (i < this.maxRecomendationsLength) {
            if ( this.citiesPriorityUnreversed[i] ) {
                let item = $(Awesomplete.ITEM(this.citiesPriorityUnreversed[i], ""));
                this._bussolaRecomendations.append( item );
                item.addClass("bussola_recomendations-container--item");
                item.on("click", (e) => {
                    // this.cityChosedByRecomendation = true;
                    console.log("3");
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
            if( i < ((this.helpers.isMobile()) ? 5 : 4) ){
                $(this.awesomplete.ul).removeAttr("hidden");
                $(this.awesomplete.ul).append($(Awesomplete.ITEM(this.citiesPriorityUnreversed[city],"")).on("click", (e) => {
                    // this.cityChosedByRecomendation = true;
                    // this.setCurrentCity($(e.target).text());
                    console.log("1");
                    this.hideBussolaList();
                }));
                this.awesomplete.suggestions.push({label:this.citiesPriorityUnreversed[city], value:this.citiesPriorityUnreversed[city]});
            }
            i++;
        }
    }

    //Recomendations Mobile Only:
    setDefaultRecomendationsMobileOnly(){     
        if ( this.helpers.isMobile() || this.helpers.isTablet() ){
            this.createDefaultRecomendations();
        } 
    }

    hideBussolaList(){
        var _inputComplete = $(this.bussolaMainSelector + " #autocomplete")[0];
        $(_inputComplete).blur();
    }

    /*[WUNBRAVIVOEMKT-13]*/


    setMobileBussola() {
        if (!$(this.bussolaMainSelector + ' #formbussola').hasClass('confirm')) {
            if ($(window).width() < 768) {
                $(this.bussolaMainSelector + ' .container').addClass('mobile');
    
                if (/android/i.test(navigator.useragent)) {
                    $(this.bussolaMainSelector + ' .container').addClass('android');
                }
            }
        }
    }

    setCookie(estado, cidade, ddd , preventHideBussola) {
        cookie_estado = "controle_estado=" + estado + ";expires=" + this.setExpires() + ";path=/";
        cookie_cidade = "controle_cidade=" + encodeURI(cidade.split(' - ')[0]) + ";expires=" + this.setExpires() + ";path=/";
        cookie_ddd = "controle_ddd=" + ddd + ";expires=" + this.setExpires() + ";path=/";
        cookie_recomendation = "controle_recomendation=" + ((this.cityChosedByRecomendation) ? "1" : "0") + ";expires=" + this.setExpires() + ";path=/";
    
        document.cookie = cookie_estado;
        document.cookie = cookie_cidade;
        document.cookie = cookie_ddd;
        document.cookie = cookie_recomendation;

        this.initRegionalization(estado, cidade , ddd , preventHideBussola);
    }

    setExpires(){
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000 * 24 * 30;
        now.setTime(time);
        return now.toGMTString();
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
            success: function(data) {
                console.log('Dados enviados');
            },
            error: function(error) {
                console.error('Error occurred. Error code: ' + error.code);
            }
        });
    }

    processGeolocationData( callback , data ){
        if (data != '') {
            locatedByGeoIp = true;
            this.searchDataCity((this.queryString? 'querystring' : 'geoip-success' ), data, callback);
            $(this.bussolaMainSelector + ' .bussola_autocomplete-icon').addClass('bussola_autocomplete-icon--close');
        } else {
            callback(false);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((p)=>{this.geolocationPosition(p)}, function(error) {
                }, {
                    timeout: 2000
                });
            } else {
            }
        }
    }

    regionalizaGeoIP(callback) {
        var urlGeoip = 'https://sslplataformavivow.clientes.ananke.com.br/vgeolocal/api/geolocation';
        var _this = this;
        var result = false;
    
        $('#currentCity').text('Localizando...');
        
        $.ajax({
            url: urlGeoip,
            type: "post",
            dataType: "json",
            timeout: 4000,
            success: function(data) {
                // data.City = "São Paulo";
                // data.City = "";
                _this.processGeolocationData( callback , data.City );
            },
            error: function(error) {
                console.error('Error occurred. Error code: ' + error.code);
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((p)=>{_this.geolocationPosition(p)}, function(error) {
                        _this.showCompass('abriuBussola', locatedByGeoIp, null, null, null, true, false, false)
                    }, {
                        timeout: 2000
                    });
                } else {
                    _this.showCompass();
                }
                callback(false);
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
            success: function(data) {
    
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
            error: function(data) {
                _this.showCompass('abriuBussola', locatedByGeoIp, null, null, null, true, false, false)
            }
        })
    }

    searchDataCity(origin, city, callback) {
        var _this = this;
        var cities = require('../services/CityList.js').cidades;
        let hasCity = false;

        for (var i = 0; i < cities.length; i++) {
            var autoCompleteCity = cities[i].value;
            let conditional = autoCompleteCity.indexOf(city) != -1 && autoCompleteCity.length == city.length + 5;

            if(origin === 'querystring'){
                autoCompleteCity = autoCompleteCity.toLocaleLowerCase();
                autoCompleteCity = autoCompleteCity.replace(/ /g, '');
                city =  city.toLocaleLowerCase();
                city = city.replace(/ /g, '');
                conditional = autoCompleteCity.indexOf(city) != -1;
            }
    
            if (conditional) {
                hasCity = true;
                var uf = cities[i].data;
                var ddd = cities[i].ddd;
                var cidade = cities[i].value;

                console.log(cidade)

                $('#autocomplete').val(cidade);

                callback(true, {
                    estado: uf,
                    ciudad: cidade,
                    ddd: ddd
                })

                // new Regionalization();
            }
        }

        if( !hasCity ){
            callback( false , null , true );
        }
    }

    returnFromShop(parameter) {
        // setTimeout(function() {
        //     $('html, body').animate({
        //         scrollTop: 0
        //     }, 300)
        // }, 1000);
        if (parameter == 'mudarcidade') {
            this.showCompass('abriuBussola', locatedByGeoIp, null, null, null, true, false, false);
        }
    }

    setLabelCity(cidade) {
        var label = $('.ciudad');
        $(label).find('p').text(cidade)
    }

    initRegionalization(estado, cidade, ddd , preventHideBussola) {
        $('.container-planos .container-box').remove();
        if( !preventHideBussola ){
            $('.container_modal').remove();
            // $(this.bussolaSelector).hide();
        }
        var helpers = new Helpers();
        this.setLabelCity(cidade);
        $('.plans').show();
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
        $('.label').on('click', this.SharedFunctions.MobileOpenModal);
        $('[data-target="legal-planos"]').show();
        $(".actual-location.only-tablet").css('display','flex');

        /*if ($(this.bussolaMainSelector + ' .plans-carousel-mob').hasClass('slick-initialized')) {
            $(this.bussolaMainSelector + ' .plans-carousel-mob').slick('unslick');
        }*/
    
        // window.enableMobileChat();
        // remover o item do guru caso esteja nas regionais do ne
        var svaGuru = $(".swiper-wrapper .card:nth-child(2)");

        var regions = require('../fill/regions.js').regions;

        if (jQuery.inArray(parseInt(helpers.getCookie('controle_ddd')), regions.ne) != -1) {
            svaGuru.css('display', 'none');
        } else {
            svaGuru.css('display', 'block');
        }
        
    }

    getGA() {
        var paramGA = (window.ga && ga.create);

        if (paramGA) {
            ga('require', 'linker');

            window.GAParam = "&" + ga.getAll()[0].get("linkerParam");
        }
    }
}

export default Compass;
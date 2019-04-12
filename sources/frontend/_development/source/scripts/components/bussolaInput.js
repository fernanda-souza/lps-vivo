import CitiesPriority from '../services/CitiesPriority'; /*[WUNBRAVIVOEMKT-13]*/
import Helpers from "../services/Helpers";
import SharedFunctions from "./shared/functions";
import DataLayer from "../services/DataLayer";

let locatedByGeoIp = false;
let getcookie_cidade, getcookie_ddd, getcookie_estado;
let cookie_estado, cookie_cidade, cookie_ddd, cookie_recomendation, autoCompleteCity, uf, ddd, cidade;
let statusGeoIP;
let positonLabel = true;
let cityChosedByRecomendation = false;


class BussolaInput {

    constructor() {

        // Define class properties
        this._bussolaRecomendations = $(this.bussolaMainSelector + ' #formBussola .bussola_recomendations-container');
        this.helpers = new Helpers();
        this.datalayer = new DataLayer();
        this.SharedFunctions = new SharedFunctions();
        this.bussolaMainSelector = '#vvpcnvgbussInput';
        this.sectionsOffset = (this.helpers.isMobile()) ? 120 : 60;
        this.getcookie_cidade = getcookie_cidade = decodeURI(this.helpers.getCookie('controle_cidade'));
        this.getcookie_ddd = getcookie_ddd = this.helpers.getCookie('controle_ddd');
        this.getcookie_estado = getcookie_estado = this.helpers.getCookie('controle_estado');
        this.getcookie_cidade = decodeURI(this.helpers.getCookie('controle_cidade'));
        this.getcookie_estado = decodeURI(this.helpers.getCookie('controle_estado'));
        this.getcookie_ddd = decodeURI(this.helpers.getCookie('controle_ddd'));

        // Call class methods
        this.SharedFunctions.initCompass( true );
        this.createPrediction();
        this.checkCookie();
        this.eventListeners();
        
    }

    setLabelCity() {
        var label = $('.label');
        if (positonLabel) {
            if ($(window).width() >= 1024) {
                label.hide()
            }
        }
        positonLabel = false;
    }

    closeMobModal() {
        if ( _this.helpers.isMobile() || _this.helpers.isTablet() ){
            $('.ofertas-pra').show();
            $('.modal-locations').hide();
            $('.bussola_onmodal_input').hide();
        }
    }


    initRegionalization(estado, cidade, ddd) {
        this.setLabelCity(cidade);
        this.animScrollTo("#plans_cards");
        $('#currentCity').text(cidade);
        $('#autocomplete_input').attr('placeholder', cidade);
        $('.bussola_onmodal_input').hide();
        $('.wrapper').show();
        $('.label').css('height', '30px');
        $('.bussola_onmodal_input', '.bussola_link').hide();
        $('.ciudad').show();
    }

    setCurrentCity(cityLabel) {

        this.cities = require('../services/CityList.js');
        $('#autocomplete_input').val('');
        var estado, cidade, ddd;
        var id = this.cities.cidades.filter((element, index) => {
            if (element.value == cityLabel) {
                estado = element.data;
                cidade = element.value;
                ddd = element.ddd;
                return index;
            }
        });

        if( estado && cidade && ddd ){
            cidade = cidade.substr(0, cidade.indexOf(' - '));
            this.datalayer.sendDataLayerLocation('alter-city-compass', estado, cidade, ddd);
            this.SharedFunctions.setCookie(estado, cidade, ddd); 
            let ciudad = cidade.split("-")[0];
                ciudad = ciudad.substr( 0 , ciudad.length-1 );
        }else if( !this.getcookie_cidade || this.getcookie_estado || this.getcookie_ddd ){
            this.getcookie_cidade = decodeURI(this.helpers.getCookie('controle_cidade'));
            this.getcookie_estado = decodeURI(this.helpers.getCookie('controle_estado'));
            this.getcookie_ddd = decodeURI(this.helpers.getCookie('controle_ddd'));
            this.SharedFunctions.setCookie(this.getcookie_estado, this.getcookie_cidade, this.getcookie_ddd);
        }
        
    }

    eventListeners() {
        var _this = this;
        setTimeout(setCidade, 1000);
        $(window).on('showBussolaInput' , ( e ) =>{
            switchModalOnMob();
        });
        $('.ciudad').on('click', switchModalOn);
        $('.icon-close').on('click', bussolaOff);
        $('#autocomplete_input').on('focus', reOpenPredictions);
        $(window).on( "CHANGE_LOCATION" , switchModalOnMob );
        $('.back_button').on('click', closeMobModal);
        window.addEventListener("awesomplete-selectcomplete", (e) => switchModalOff(e, this), false);
        var evt;
        document.onmousemove = function (e) {
            e = e || window.event;
            evt = e;
        }
        $("#autocomplete_input").focusout(function (e) {
            if (evt.target.id == "close_img") {
                cleanInput();
            } else {
                $('.bussola_onmodal_input', '.bussola_link').hide();
                $('.ciudad').show();
            }
        });

        function bussolaOff(){
            $('.bussola_onmodal_input').hide();
            $('.ciudad').show();
        }

        function switchModalOn() {
            $('.ciudad').hide();
            $('.bussola_onmodal_input').show();
            $('.bussola_link').show();
            $('#autocomplete_input').focus();
            _this.getcookie_cidade = decodeURI(_this.helpers.getCookie('controle_cidade'));
            _this.getcookie_estado = decodeURI(_this.helpers.getCookie('controle_estado'));
            _this.getcookie_ddd = decodeURI(_this.helpers.getCookie('controle_ddd'));
        }

        
        function switchModalOnMob( e ) {
            if ( _this.helpers.isMobile() || _this.helpers.isTablet() ){
                $('header').css( "z-index" , 8 );
                $('body').css('overflow', 'hidden');
                $('.ofertas-pra').hide();
                $('.modal-locations').show();
                $('.bussola_enter_location').append($('.bussola_onmodal_input'));
                $('.bussola_onmodal_input').show();
                $('#autocomplete_input').focus();
                e.stopImmediatePropagation();
            }
        }

         
        function closeMobModal() {
                if ( _this.helpers.isMobile() || _this.helpers.isTablet() ){
                    $('.ofertas-pra').show();
                    $('.modal-locations').hide();
                    $('.bussola_onmodal_input').hide();
                    $('body').css('overflow', 'auto');
                    $('header').css( "z-index" , 2 );
                }
            }
    

        function switchModalOff(e, self) {
            if( $(e.target).parent().parent().hasClass("bussola_hideonloading_input")){
                self.setCurrentCity(e.text.label);
                $('.bussola_onmodal_input', '.bussola_link').hide();
                $('.ciudad').show();
                $("#triggerAssistant").show();
            }
        }

        function cleanInput(e, hevent, self) {
            $('#autocomplete_input').val('');
        }


        function closeMobileBussola() {
            $('.bussola_onmodal_input').hide();
            $('.wrapper').show();
            $('.label').css('height', '30px');
            $('.label').bind();
        }

        function reOpenPredictions() {
            $('.awesomplete').find('ul').attr('hidden', false);
        }

        var setCidade = () => {
            var cidade = $('#currentCity').text();
            $('#autocomplete_input').attr('placeholder', cidade);
        }

    }

    checkCookie() {
        if (getcookie_ddd == "" || getcookie_cidade == "" || getcookie_estado == "") {
            //   $('.ciudad').hide();
            $('.ciudad').show();
        } else {
            $('.ciudad').show();
            $('.bussola_onmodal_input', '.bussola_link').hide();
        }
    }

    checkMaxRecomendations() {
        return $(this.bussolaMainSelector + " .bussola_recomendations-container").children().length < this.maxRecomendationsLength;
    }

    hideBussolaList(){
        var _inputComplete = $(this.bussolaMainSelector + " #autocomplete")[0];
        $(_inputComplete).blur();
    }

    createPrediction() {
        this.maxRecomendationsLength = 4;

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

        this.searchByState = false;
        this.unfilteredByStates = false;
        this.needToRefreshSuggestions = false;
        this.filteredByStates = [];
        this.citiesPriority = (new CitiesPriority()).cidades.reverse();
        this.citiesPriorityUnreversed = (new CitiesPriority()).cidades;

        this._regionModal = $(this.bussolaMainSelector + " .nova_bussola_regiao_modal");
        this._awesompletePreUl = '.awesomplete--pre-ul';
        this.cityChosedByRecomendation = false;


        if (true) {
            var _inputComplete = $("#autocomplete_input")[0];

            this.awesomplete = new Awesomplete(_inputComplete, {
                minChars: 2,
                autoFirst: true,
                maxItems: 3,
                item: (text, input) => {
                    // suggestions
                    if (!this.needToRefreshSuggestions) {
                        this.needToRefreshSuggestions = true;
                        this._bussolaRecomendations.html("");
                    }
                    if (true) {
                        let item = $(Awesomplete.ITEM(text, text.label.toLowerCase().match(_formatRegexp(input).toLowerCase())[0]));
                        item.addClass("bussola_recomendations-container--item");
                        item.on("click", (e) => {
                            // this.cityChosedByRecomendation = true;
                            var id = $(e.target).text();
                            console.log("***id" , id);
                            this.hideBussolaList();
                            this.setCurrentCity(id); //comento para que no dispare la localización, sólo debe dispararse con el botón confirmar
                        });
                        this._bussolaRecomendations.append(item);
                    }
                    // end suggestions
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


            var createDefaultRecomendations = () => {
                var text = $('#autocomplete_input').val().length;
                if (text == 0) {
                    $(this.awesomplete.ul).html("");
                    this.awesomplete.suggestions = [];
                    var i = 0;
                    for (var city in this.citiesPriorityUnreversed) {
                        if (i < ((this.helpers.isMobile()) ? 5 : 4)) {
                            $(this.awesomplete.ul).removeAttr("hidden");
                            $(this.awesomplete.ul).append($(Awesomplete.ITEM(this.citiesPriorityUnreversed[city], "")).on("click", (e) => {
                                // this.cityChosedByRecomendation = true;
                                console.log("$(e.target).text()" , $(e.target).text());
                                this.setCurrentCity($(e.target).text());
                            }));
                            this.awesomplete.suggestions.push({
                                label: this.citiesPriorityUnreversed[city],
                                value: this.citiesPriorityUnreversed[city]
                            });
                        }
                        i++;
                    }
                } else {
                    this.awesomplete.suggestions = []
                }
            }

            $('#autocomplete_input').on('focus', createDefaultRecomendations);


            this.cities = require('../services/CityList.js');
            var listComplete = [];
            $.each(this.cities.cidades, function (key, item) {
                listComplete.push(item.value);
            });
            //this.awesomplete.list = listComplete.sort();
            // listComplete = listComplete.sort();
            this.awesomplete.list = listComplete;
        }
    }

}


export default BussolaInput;

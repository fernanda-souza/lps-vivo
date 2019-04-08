import BannerConversao from "./BannerConversao";
import BannerConsideracao2 from "./BannerConsideracao2";
import BannerConsideracao from "./BannerConsideracao";
import BannerAwareness from "./BannerAwareness";
import BannerAwarenessLocalizado2 from "./BannerAwarenessLocalizado_2";
import BannerGiga from "./BannerGiga";
import Helpers from "../services/Helpers"

class QueryStringHandler {
    constructor() {
        this.helpers = new Helpers();
        // this.urlParam = this.helpers.getUrlParameter("cards");
        this.urlParam = '';
        this.banner;
    }

    relocateContent(){
        if( this.urlParam ){
            switch(this.urlParam) {
                case 'top': 
                    $("#planos").insertAfter(".section-banner");
                    $("#planos").css("padding-top" , "0" );
                    $(".title_planos").hide();
                break;

                case 'middle': 
                    $("#planos").insertAfter("#vantagens");
                    //console.log("mslsd")
                break;
            }
        }else{
            $("#planos").insertAfter(".section-banner");
            $(".title_planos").hide();
            $("#planos").css("padding-top" , "0" );
        }
    }

    parseURLParam(){
        if( this.urlParam ){
            switch(this.urlParam) {
                case 'top': 
                    this.banner = new BannerConversao( $('.container_banner') );
                    this.banner.setupTemplate();

                break;

                case 'middle': 
                    // this.getcookie_ddd = getcookie_ddd = helpers.getCookie('controle_ddd');
                    this.banner = new BannerConsideracao2( $('.container_banner') );
                    this.banner.setupTemplate();
                    //console.log('middle')
                break;

                case 'middle_2': 

                    this.banner = new BannerAwarenessLocalizado2( $('.container_banner') );
                    this.banner.setupTemplate();
                break;

                case 'bottom': 
                    this.banner = new BannerAwareness( $('.container_banner') );
                    this.banner.setupTemplate();
                break;

                default: 
                    this.banner = new BannerConversao( $('.container_banner') );
                    this.banner.setupTemplate();
                break;
            }
        }else{
            this.banner = new BannerGiga( $('.container_banner') );
            this.banner.setupTemplate();
        }
    }

}

export default QueryStringHandler;
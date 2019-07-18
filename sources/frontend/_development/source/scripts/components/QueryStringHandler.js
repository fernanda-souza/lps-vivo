import BannerGiga from "./BannerGiga";
import Helpers from "../services/Helpers";

class QueryStringHandler {
    constructor() {
        this.helpers = new Helpers();
        // this.urlParam = this.helpers.getUrlParameter("cards");
        this.urlParam = "";
        this.banner;
    }

    parseURLParam() {
        this.banner = new BannerGiga($(".container_banner"));
        this.banner.setupTemplate();
    }
}

export default QueryStringHandler;

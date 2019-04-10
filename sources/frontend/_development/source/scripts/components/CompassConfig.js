import Helpers from "../services/Helpers";

class CompassConfig {

    constructor(bussola) {

        this.bussola = bussola;

        this.moveTo = (cssClass) => {
            this.currentPosition = cssClass.substring(1);
            $(this.bussola).appendTo(cssClass);
        }

        this.initFooterOn = (el, pagefooter, _offset) => {
            var stickyfooter = $(".nova_bussola-sticky-footer")
            if (el === false) {
                stickyfooter.slideUp(200);
                $(window).off("scroll");
                return;
            }
            _offset = (_offset !== undefined) ? _offset : 0;

            function isStartPosition (){
                // check element offset
                return ( ( $(el).length > 0 ) ? ( $(window).scrollTop() > ($(el).offset().top - _offset) ) : false );
            }
            function isEndPosition (){
                // check footer offset
                return ($(window).scrollTop() + Math.abs($(pagefooter).height() - $(window).height())) <
                $(pagefooter).offset().top
            }
            
            var toggleFooter = function(e){
                if ( isStartPosition() ) {
                    if (stickyfooter.css("display") == "none") {
                        stickyfooter.slideDown(200);
                    }
                }
                else if (stickyfooter.css("display") == "block") {
                    stickyfooter.slideUp(200);
                }
            }

            $(window).on("scroll", toggleFooter);
        }

    }


}

export default CompassConfig;
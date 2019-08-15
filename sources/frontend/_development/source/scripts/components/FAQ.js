import Helpers from "../services/Helpers";

class FAQ {
    constructor() {
        this.helpers = new Helpers();
        this.addJqueryFunctions();
        this.initFaqs();
    }

    addJqueryFunctions() {
            $.fn.animateRotate = function(angle, duration, easing, complete) {
                return this.each(function() {
                var $elem = $(this);
            
                $({deg: 0}).animate({deg: angle}, {
                duration: duration,
                easing: easing,
                step: function(now) {
                    $elem.css({
                        transform: 'rotate(' + now + 'deg)'
                    });
                },
                complete: complete || $.noop
                });
            });

        };  
    }

    dataLayer(faq) {
        $(faq.element).find('.item-title').attr('data-analytics-id', 'click-faq');
        $(faq.element).find('.item-title').attr('data-analytics-item-name', this.helpers.stringSanitize( faq.name ) );
    }

    initFaqs() {
        var titleQuestionContent;
        var _this = this;
        $('.item-faq').each(function( index , value ) {

            let faq_content = $(value).find('h4').text();
            _this.dataLayer({
                element: value,
                name: faq_content
            })
            
            var openFaq = (element) => {
                $(element).addClass('open');
                $(this).find('div.item-content').fadeIn(400);
            }
            var closeFaq = (element) => {
                $(element).removeClass('open');
                $(this).find('div.item-content').fadeOut(400);
            }
            $(this).find('.arrow-down, .item-title').on('click', function(){
                let el = $(this).find('a.arrow-down');
                if($(el).hasClass('open')){
                    closeFaq(el);
                }else{
                    openFaq(el);
                }
            })
        });
    }
}

export default FAQ;

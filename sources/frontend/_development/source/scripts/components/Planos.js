class Planos {
    constructor() {
        let element = $(".inner-planos-mobile");
        const slickConfig = {
            dots: true,
            infinite: false,
            slidesToShow: 1.2,
            slidesToScroll: 1,
            draggable: true,
            centerMode: false,
            swipeToSlide: true,
            mobileFirst: true,
            arrows: false,
            variableWidth: true
        };
        if ($(element).hasClass("slick-initialized")) {
            $(element).slick("unslick");
            this.initSlick(element, slickConfig);
        } else {
            this.initSlick(element, slickConfig);
        }
        this.initTabs();
    }

    initSlick(element, settings) {
        $(element).slick(settings);
    }

    initTabs() {
        $(".tabs__option").click(function() {
            var target = $(this).data("target");
            $(".tabs__option").removeClass("-active");
            $(this).addClass("-active");

            $(".tab__content").removeClass("-show");
            $(".tab__content[data-aba='" + target + "']").addClass("-show");
        });
    }
}

export default Planos;

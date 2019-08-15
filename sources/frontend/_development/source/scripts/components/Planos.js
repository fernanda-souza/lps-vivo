class Planos {
    constructor() {
        let element = $(".inner-planos-mobile");
        const slickConfig = {
            dots: true,
            infinite: false,
            slidesToShow: 1.1,
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

            $(".container_planos h2").removeClass("-show");
            $(".tab__content").removeClass("-show");
            $(".container_planos h2[data-aba='" + target + "']").addClass("-show");
            $(".tab__content[data-aba='" + target + "']").addClass("-show");
        });
    }
}

export default Planos;

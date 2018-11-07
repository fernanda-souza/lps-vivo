class Gigas {
    constructor() {
        let element = $('.slider-gigas');
        const slickConfig = {
            dots: true,
            infinite: false,
            slidesToShow: 1.2,
            slidesToScroll: 1,
            draggable: true,
            centerMode: true,
            swipeToSlide: true,
            mobileFirst: true,
            arrows: false,
            variableWidth: true,
        };
        this.initSlick(element, slickConfig);
    }

    initSlick(element, settings) {
        $(element).slick(
            settings
        );
    }
}

export default Gigas;

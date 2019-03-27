import Helpers from "../services/Helpers";

class Aplicativos {
    constructor() {
        this.helpers = new Helpers();
        let element = $('.slider-aplicativos');
        this.currentIndex = 0;
        var _this =  this;
        const slickConfig = {
            autoplay: true,
            responsive: [{
                    breakpoint: 3000,
                    settings: {
                        dots: true,
                        autoplay: false,
                        infinite: true,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        draggable: false,
                        centerMode: true,
                        arrows: false,
                        variableWidth: true,
                        swipeToSlide: false,
                        centerPadding: "0"
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        dots: true,
                        infinite: false,
                        autoplay: true,
                        slidesToShow: 1.5,
                        slidesToScroll: 1,
                        draggable: true,
                        centerMode: true,
                        variableWidth: true,
                    }
                }

            ]
        };

        $.fn.isOnScreen = function( win ){
            let viewport = {};
            viewport.top = win.scrollTop();
            viewport.bottom = viewport.top + win.height();

            let bounds = {};
            bounds = this.offset();
            bounds.bottom = bounds.top + this.outerHeight();
            
            return !( viewport.bottom < bounds.top || viewport.top > bounds.bottom)
        }

        this.initSlick(element, slickConfig);

        $('.item-aplicativos').on('click', function(){
            let index = $(this).attr('data-slick-index');
            //console.log( "change slick index" , index );
            // if( index != _this.currentIndex){

            //     if( _this.currentSlide ){
            //         _this.currentSlide.removeClass('large-icon');
            //     }
            //     let newPosition = 64 * index + ( 26 * ( index-1 ) );
            //     //console.log( newPosition );
            //     $(element).find(".slick-track").css("transform" , "translate3d(-" + newPosition + "px , 0 , 0)");
            //     this.currentIndex = index;
            //     $(this).addClass('large-icon');
            //     _this.currentSlide = $(this);
            // }
            $(element).slick('slickGoTo', index);
        })
        // this.dataLayerSlider(element);
    }

    dataLayerSlider(product){
        var _this = this;
        if( $('.container-aplicativos').isOnScreen( $(window) ) ){
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'click-carrosel-app',
                'page': window.location.href,
                'title': document.title,
                'custom': {
                        'dimensions': {
                        'product-name': _this.helpers.stringSanitize(product.name),
                    }
                }
            });
        }
    }

    dataLayer(product) {
        var _this = this;
        $('#saiba-mais').attr('data-analytics-id', 'click-more-information');
        $('#saiba-mais').attr('data-analytics-product-name', _this.helpers.stringSanitize(product.name));
        $('#saiba-mais').attr('data-analytics-position', 'svas');
        $('#saiba-mais').attr('data-analytics-sku', product.sku);
        $('#saiba-mais').attr('data-analytics-label', 'saiba-mais');
        this.dataLayerSlider(product);
    }

    initSlick(element, settings) {
        var _this = this;

        $(element).slick(settings);
        
        $(element).on('beforeChange', function(event, slick, currentSlide, nextSlide){
            _this.changeImageSize(slick, currentSlide, nextSlide);
            _this.getTextByPosition(nextSlide);
        });

        _this.getTextByPosition(0);
    }

    changeImageSize(slick, currentSlide, nextSlide) {
        var currentSlideElement = $( $('.item-aplicativos').not('.slick-cloned')[currentSlide] );
        if( currentSlideElement && currentSlideElement.hasClass( "large-icon" ) ){
            currentSlideElement.removeClass( "large-icon" );
        }

        var element = $('.item-aplicativos').not('.slick-cloned')[nextSlide];

        $(element).addClass('large-icon');
    }

    getTextByPosition(slide) {
        const fill = [
            {
                title: 'GoRead',
                description: 'Banca virtual com mais de 200 revistas <br/> digitais. Leia as principais publicações<br/> do Brasil no seu smartphone.',
                url: 'http://appstorevivo.clientes.ananke.com.br/entretenimento/vivo-go-read/controle.html?_ga=2.182437863.1980575863.1538515923-298680962.1534272275&_gac=1.155185610.1538604520.Cj0KCQjw0dHdBRDEARIsAHjZYYC26CsznfSlumLnbPryGoKccX_cj4jWKBXYuZyMJHXE6N1NBNFZMrQaAhF7EALw_wcB'
            },
            {
                title: 'Vivo Cloud Sync',
                description: 'Proteja e sincronize suas fotos, músicas,<br/> vídeos e contatos do seu smartphone,<br/> tablet e computador na nuvem de 32GB.',
                url: 'http://appstorevivo.clientes.ananke.com.br/desktop/vivo/seguranca-assintencia/vivo-sync/controle.html?_ga=2.182437863.1980575863.1538515923-298680962.1534272275&_gac=1.155185610.1538604520.Cj0KCQjw0dHdBRDEARIsAHjZYYC26CsznfSlumLnbPryGoKccX_cj4jWKBXYuZyMJHXE6N1NBNFZMrQaAhF7EALw_wcB'
            },
            {
                title: 'Kantoo Inglês',
                description: 'Já pensou em ter um curso de inglês<br/> na palma da mão? Estude quando e onde<br/> estiver com o app no seu smatphone.',
                url: 'http://appstorevivo.clientes.ananke.com.br/desktop/vivo/educacao/kantoo-ingles/controle.html?_ga=2.253044937.1980575863.1538515923-298680962.1534272275&_gac=1.128448638.1538604520.Cj0KCQjw0dHdBRDEARIsAHjZYYC26CsznfSlumLnbPryGoKccX_cj4jWKBXYuZyMJHXE6N1NBNFZMrQaAhF7EALw_wcB'
            },
            {
                title: 'NBA',
                description: 'Assista aos bastidores dos jogos, jogos clássicos<br class="only-desktop"/> da NBA, melhores momentos<br class="only-desktop"/> das partidas e jogadas em “super<br class="only-desktop"/> câmera lenta”.',
                url: 'http://appstorevivo.clientes.ananke.com.br/desktop/vivo/entretenimento/vivo-nba/controle.html?_ga=2.253044937.1980575863.1538515923-298680962.1534272275&_gac=1.128448638.1538604520.Cj0KCQjw0dHdBRDEARIsAHjZYYC26CsznfSlumLnbPryGoKccX_cj4jWKBXYuZyMJHXE6N1NBNFZMrQaAhF7EALw_wcB'
            },
            {
                title: 'Vivo Guru',
                description: 'A solução para suas dúvidas<br/> e dificuldades com os dispositivos<br/> eletrônicos com suporte 24h por dia.',
                url: 'http://appstorevivo.clientes.ananke.com.br/desktop/vivo/utilidades/vivo-guru/controle.html?_ga=2.182437863.1980575863.1538515923-298680962.1534272275&_gac=1.155185610.1538604520.Cj0KCQjw0dHdBRDEARIsAHjZYYC26CsznfSlumLnbPryGoKccX_cj4jWKBXYuZyMJHXE6N1NBNFZMrQaAhF7EALw_wcB'
            },
        ];

        $('.aplicativo-info').find('h2').text(fill[slide].title)
        $('.aplicativo-info').find('p').html(fill[slide].description)
        $('.aplicativo-info').find('a').attr('href', fill[slide].url)
        this.dataLayer({
            name: fill[slide].title,
            sku: 'undefined'
        });
    }
}

export default Aplicativos;

class LayoutController {
    constructor() {

    }

    setTemplate(bussola, city) {
        console.log(bussola)
        switch(bussola) {
            case 'mainbussola': 
                const { cidade, uf, ddd } = city;
                $('.container-planos .container-box').remove();
                $('.container_modal').remove();
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
                // $('.label').on('click', this.SharedFunctions.MobileOpenModal);
                $('[data-target="legal-planos"]').show();
                $(".actual-location.only-tablet").css('display','flex');
            break;

            case 'headerbussola':
                $('.ciudad').on('click', function(){
                    $(this).hide();
                    $('.bussola_onmodal_input').show();
                    $('.bussola_link').show();
                    $('.icon-close').on('click', function(){
                        $('.bussola_onmodal_input').hide();
                        $('.ciudad').show();
                    })
                });
            break;

            default:
                console.error('Do you have set any bussola from this action!');
        }
    }
}

export default LayoutController;
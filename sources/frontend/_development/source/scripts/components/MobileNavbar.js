import Helpers from "../services/Helpers";

class MobileNav {
    constructor() {
        this.helpers = new Helpers();
        this.comp_0002_banner_param();

        $('a[href*="#"]').on('click', function (e) {

            if( $(e.currentTarget ).attr('id') !== "box-btn_right"){
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: $($(this).attr('goTo')).offset().top - $("#header").height()
                }, 500, 'linear');
            }else{
                $("#modalChatvivi").fadeOut("slow");
            }
        });

    }

    comp_0002_banner_param() {
        $("#bt-menu-mob").bind("click", this.onToggleMobMenu);

        $('.header__nav .header__link').not('.compass').click(function () {
            event.preventDefault();
            var id = $(this).data("link");
            $("html, body").animate({
                scrollTop: $('#' + id).offset().top - 70
            }, 1000, function () {
                $('#' + id).focus();
            });
        })

        $(".header__nav .header__link").bind("click", this.onToggleMobMenu);
    }

    onToggleMobMenu() {
        this.helpers = new Helpers();

        if (!this.helpers.isDesktop()) {
            $("#bt-menu-mob").toggleClass("open");
            $(".header__nav").slideToggle();
        }
    }
}

export default MobileNav;

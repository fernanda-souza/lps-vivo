class MenuMobile {
    constructor() {

        $(".btn-menu-mobile").click(function () {
            $(".menu-mobile").css("right", "0px");
        });

        $(".closebtn, .sidenav > ul > li > a").click(function () {
            $(".menu-mobile").css("right", "-255px");
        });
    }

  
}

export default MenuMobile;
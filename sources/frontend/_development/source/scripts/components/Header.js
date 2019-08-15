class Header {
    constructor() {
        this.initScrollSpy();
        this.initStickyHeader();
    }

    initStickyHeader() {
        $(window).scroll(function () {
            if ($(window).scrollTop() > $(".section-banner").height() - 100) {
                $("header").addClass("fixo-show").removeClass("fixo-hide");
            } else
                $("header").removeClass("fixo-show").addClass("fixo-hide");
        });
    }


    initScrollSpy() {
        $(document).on('scroll', function(e)
        {
            $('section').each(function()
            {
                if ( $(this).offset().top < window.pageYOffset + 10 &&  $(this).offset().top + $(this).height() > window.pageYOffset + 10 ) 
                {
                  var data = $(this).attr('id');
                  
                  if(data){
                      if('#'+data != window.location.hash){
                        if(history.pushState) {
                            history.pushState(null, null, '#'+data);
                        }
                        else {
                            window.location.hash = '!'+data;
                        }
                    }
                  }
                }
            }).not('.section__wrapper');
        });
    }
}

export default Header;

class Banner{

    constructor(){

        this.templateHTML;

    }

    setupTemplate(){
        //console.log("override this method");
    }

    addListeners(){
        //console.log( "addListeners" );
        $('[data-action="anchor"]').on('click', function (e) {
            //console.log( "click anchor" );
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $("#" + $(this).attr('data-target')).offset().top - $("#header").height()
            }, 500, 'linear');
        });
    }

}

export default Banner;
class ModalVivi {
    constructor() {
        this.openModal();
        this.closeModal();
        this.openChatVivi();
        this.openChatDireto();
        // this.verificaDate();
        console.log("construct");
    }

    openModal() {
        console.log("openmovivi");
        let openModal = $(".btnnull, #triggerAssistant");
        // openModal.show();
        openModal.click(function(e) {
            e.preventDefault();
            $("#modalChatvivi").fadeIn();
        });
    }

    closeModal() {
        let closeModal = $(".btn-fechar");
        closeModal.click(function(e) {
            e.preventDefault();
            $("#modalChatvivi, #modalChatdireto").fadeOut();
        });
    }

    openChatVivi() {
        console.log("chat vivi");

        let openChat = $(".section__wrapper");
        openChat.delegate("#box-btn_right3", "click", function(e) {
            e.preventDefault();
            $("#modalChatvivi").fadeOut("slow");
            $("#web").trigger("click");
        });
    }

    openChatDireto() {
        let openChat = $("#box-btn_left");
        openChat.click(function(e) {
            e.preventDefault();
            console.log("teste");
            $("#modalChatvivi").fadeOut("slow");
            $("#modalChatdireto").fadeIn("slow");
        });
    }

    // verificaDate(){
    //     // Date Teste
    //     // July 24, 1983 23:59:59

    //     var d = new Date();
    //     var weekday = new Array(7);
    //     weekday[0] = "Sunday";
    //     weekday[1] = "Monday";
    //     weekday[2] = "Tuesday";
    //     weekday[3] = "Wednesday";
    //     weekday[4] = "Thursday";
    //     weekday[5] = "Friday";
    //     weekday[6] = "Saturday";

    //     var currentDay = weekday[d.getDay()];
    //     var sunday = weekday[0]
    //     var saturday = weekday[6]
    //     var weekAll = new Array(weekday[1], weekday[2], weekday[3], weekday[4], weekday[5])

    //     var hour = d.getHours();

    //     if(weekAll.indexOf(currentDay) != -1){
    //         if(hour >= 7 && hour < 24){
    //             $(".btnnull").show()
    //         } else{
    //             $(".btnnull").hide()
    //         }
    //     }
    //     if(currentDay == weekday[0]){
    //         if(hour >= 9 && hour < 21){
    //             $(".btnnull").show()
    //         } else{
    //             $(".btnnull").hide()
    //         }
    //     }
    //     if(currentDay == weekday[6]){
    //         if(hour >= 8 && hour < 22){
    //             $(".btnnull").show()
    //         } else{
    //             $(".btnnull").hide()
    //         }
    //     }

    // }
}

export default ModalVivi;
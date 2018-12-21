class ModalVivi {
    constructor() {
        this.openModal();
        this.closeModal();
        this.openChatVivi();
        this.openChatDireto();
    }

    openModal() {
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
            var srcIframe = $("#modalChatdireto iframe").attr("src");
            $("#modalChatdireto iframe").attr("src", srcIframe+window.GAParam);
            $("#modalChatvivi").fadeOut("slow");
            $("#modalChatdireto").fadeIn("slow");
        });
    }
}

export default ModalVivi;
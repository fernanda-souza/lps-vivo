import Helpers from "../services/Helpers"
import config from '../../config.js'

if(config.env === 'development'){
    var url = '//vivoparasuacasa.clientes.ananke.com.br/server';
}else{
    var url = '//vivoparasuacasa.clientes.ananke.com.br/server';
}

class ChatController {
    constructor() {
        this.helpers = new Helpers();
        let date = new Date();
        let day = (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate())
        let month = (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1)

        this.today = {
            day: day,
            month: month,
            year: date.getFullYear()
        }
        this.token = 'bWF0ZXVzLm9saXZlaXJhLmV4dEB3dW5kZXJtYW4uY29tJmhhc2g9ODkxMzY2NTU';
        this.limit = 0;
        console.log(this.today)
        this.checkHoliday();
    }

    checkHoliday() {
        const date = `${this.today.day}/${this.today.month}/${this.today.year}`;
        var _this = this;
        $.ajax(`https://api.calendario.com.br/?json=true&ano=${this.today.year}&ibge=3550308&token=${this.token}`, {
            method: 'GET'
        }).done(function(holidays){
            const dates = [];
            holidays.forEach(holiday => {
                if(holiday.type === 'Feriado Nacional'){
                    dates.push(holiday.date)
                }
            });
            console.log(dates)
            if(dates.includes(date)){
                _this.verifyTime(true);
            }else{
                _this.verifyTime(false);
            }
        });
    }

    verifyTime(isHoliday) {
        if(isHoliday){
            $('.btnnull').hide();
            $('#triggerAssistant').hide();
        } 
        else{
            $.ajax(`${url}/getTime.php`, {
                method: 'GET'
            }).done(function(res){
                if(!res.date){
                    $('.btnnull').hide();
                    $('#triggerAssistant').hide();
                }else{
                    showButtonChat();
                }
            });
        }
    }

    showButtonChat(){
        if ($(window).width() < 426) {
            $('#triggerAssistant').show();
            $(".btnnull").hide();
        } else {
            $('#triggerAssistant').hide();
            $(".btnnull").show();
        }
    }
  

}

export default ChatController;
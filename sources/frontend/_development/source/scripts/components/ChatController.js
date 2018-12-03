import Helpers from "../services/Helpers"
import config from '../../config.js'

if(config.env === 'development'){
    var url = '//sslplataformavivol.clientes.ananke.com.br/vivovaloriza/server/controle';
}else{
    var url = '//sslplataformavivol.clientes.ananke.com.br/vivovaloriza/server/controle';
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
            for (var index = 0; index < dates.length; index++) {
                const element = array[index];
                if(element == date){
                    _this.verifyTime(true);
                }else{
                    _this.verifyTime(false);
                }
            }
        });
    }

    verifyTime(isHoliday) {
        var _this = this;
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
                    _this.showButtonChat();
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
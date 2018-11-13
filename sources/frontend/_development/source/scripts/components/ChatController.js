import Helpers from "../services/Helpers"
import config from '../../config.js'

if(config.env === 'development'){
    var url = 'http://hmlvivoparasuacasa.clientes.ananke.com.br/server';
}else{
    var url = 'http://vivoparasuacasa.clientes.ananke.com.br/server';
}

class ChatController {
    constructor() {
        this.helpers = new Helpers();
        let date = new Date();
        this.today = {
            day: date.getDay(),
            month: date.getMonth(),
            year: date.getFullYear()
        }
        this.token = 'bWF0ZXVzLm9saXZlaXJhLmV4dEB3dW5kZXJtYW4uY29tJmhhc2g9ODkxMzY2NTU';
        this.limit = 0;
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
                dates.push(holiday.date)
            });
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
        } 
        else{
            $.ajax(`${url}/getTime.php`, {
                method: 'GET'
            }).done(function(res){
                if(!res.date){
                    $('.btnnull').hide();
                }
            });
        }
    }
  

}

export default ChatController;
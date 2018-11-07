import Helpers from "../services/Helpers"

window.dataLayer = window.dataLayer || [];

class DataLayer {
    constructor() { 
        this.helpers = new Helpers();
        this.positionCard = this.helpers.getUrlParameter("cards");
     }

    sendDataLayerLocation(event, estado, cidade, ddd , origem) {
        // event = evento;
        window.dataLayer.push({
            'event': event,
            'page': window.location.href,
            'title': document.title,
            'custom': {
                'dimensions': {
                    'user-state': ( estado? this.helpers.stringSanitize(estado) : undefined ), // obrigatório em todos os casos
                    'user-city': ( cidade? this.helpers.stringSanitize(cidade) : undefined ), // obrigatório em todos os casos
                    'ddd': ( ddd? ddd : undefined ), // obrigatório em todos os casos
                    'id-origem-vivo' : origem,
                    'init-session':'vivo-controlegiga:b2c:movel',
                    'position-cards': ( this.positionCard? this.positionCard : undefined )                            
                }
            }
        });
    }

    sendDataLayerInit(event, estado, cidade, ddd , origem) {
        window.dataLayer.push({
            'event': event,
            'page': window.location.href,
            'title': document.title,
            'custom': {
                'dimensions': {
                    'user-state': ( estado? this.helpers.stringSanitize(estado) : undefined ), // obrigatório em todos os casos
                    'user-city': ( cidade? this.helpers.stringSanitize(cidade) : undefined ), // obrigatório em todos os casos
                    'ddd': ( ddd? ddd : undefined ), // obrigatório em todos os casos
                    'id-origem-vivo' : origem,
                    'init-session':'vivo-controlegiga:b2c:movel',
                    'position-cards': ( this.positionCard? this.positionCard : undefined )                            
                }
            }
        });
    }


    sendDataBussola(event, estado, cidade, ddd , origem){
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': event,
            'page': window.location.href,
            'title': document.title,
            'custom': {
                'dimensions': {
                'user-state': ( estado? this.helpers.stringSanitize(estado) : undefined ), // obrigatório em todos os casos
                'user-city': ( cidade? this.helpers.stringSanitize(cidade) : undefined ), // obrigatório em todos os casos
                'ddd': ( ddd? ddd : undefined ), // obrigatório em todos os casos
                }
            }
        })
    }

    sendDataLayerProducts(evento, estado, cidade, ddd, sku) {
        dataLayerGauge.push({
            event: evento,
            user: {
                ddd: ddd ? ddd.toString() : '',
                estado: estado ? this.helpers.stringSanitize(estado) : '',
                cidade: cidade ? this.helpers.stringSanitize(cidade) : ''
            },
            product: {
                sku: sku ? sku : ''
            }
        })
    }

    sendDataLayerGeneric(evento, estado, cidade, ddd) {
        dataLayerGauge.push({
            event: evento,
            user: {
                ddd: ddd ? ddd.toString() : '',
                estado: estado ? this.helpers.stringSanitize(estado) : '',
                cidade: cidade ? this.helpers.stringSanitize(cidade) : ''
            }
        })
    }
}

export default DataLayer;

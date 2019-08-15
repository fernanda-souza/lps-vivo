// class AdobeLaunch {
//     constructor() { 
//         this.launch();
//     }

//     launch() {
//         var domains = {
//             "hml": {
//                 "adobeLaunchUrl": "//assets.adobedtm.com/launch-EN5a75c3e4920c466d8d0d0f582c844a44-development.min.js",
//                 "url": "http://hml.vivo4g.clientes.ananke.com.br/controle/"
//             },
        
//             "prod": {
//                 "adobeLaunchUrl": "//assets.adobedtm.com/launch-ENdcf98895191a431f8665c1842c1b5df3.min.js",
//                 "url": "http://www.vivo4g.com.br/controle/",
//                 "url2": "http://www.vivocontrolegiga.com.br/"
//             }
//         };
        
//         var currentDomain = location.href;
//         var script = document.createElement('script'); 
//             script.type = 'text/javascript';
            
        
//         if(currentDomain == domains.hml.url) {
//             script.src = domains.hml.adobeLaunchUrl;
//             $("head").append(script);
//         } else if(currentDomain == domains.prod.url1){
//             script.src = domains.prod.adobeLaunchUrl;
//             $("head").append(script);
//         } else if(currentDomain == domains.prod.url2){
//             script.src = domains.prod.adobeLaunchUrl;
//             $("head").append(script);
//         }
//     }

// }

// export default AdobeLaunch;
import Helpers from "../services/Helpers";
import Regionalization from "../services/Regionalization";

$(function() {
    var docCookies = {
        getItem: function(sKey) {
            if (!sKey) {
                return null;
            }
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                return false;
            }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        },
        removeItem: function(sKey, sPath, sDomain) {
            if (!this.hasItem(sKey)) {
                return false;
            }
            document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
            return true;
        },
        hasItem: function(sKey) {
            if (!sKey) {
                return false;
            }
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: function() {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
                aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
            }
            return aKeys;
        }
    };

    var helpers = new Helpers();

    var currentDDD = helpers.getCookie('ddd');
    var regional = helpers.getCookie('estado');
    var userReg = helpers.getCookie('userReg');

    if (regional == ""){
        return;
    }


    if (!userReg || userReg != regional || !currentDDD) {
        if (window.location.host == "www.vivo.com.br") {
            abreBoxDdd();
        }
        userReg = docCookies.setItem('userReg', window.regional)
    }

    if (window.location.host == "www.vivo.com.br") {
        // //listagem de DDDs
        var lista = document.getElementById('listaDdd');
        var selectDdd = lista.querySelectorAll("." + regional);
        for (i = 0; i < selectDdd.length; i++) {
            selectDdd[i].style.display = 'block';
        }
    }

    function listaDdd() {
        if (lista.style.display == 'block') {
            lista.style.display = 'none';
        } else {
            lista.style.display = 'block';
        }

    }
    var btnLista = document.getElementById('selectBox');
    if (btnLista.addEventListener) {
        btnLista.addEventListener('click', listaDdd);
    } else if (btnLista.attachEvent) {
        btnLista.attachEvent('onclick', listaDdd);
    }

    //abrindo lightbox
    function abreBoxDdd() {
        document.getElementById('overlayDdd').style.display = 'block';
        document.getElementById('box-select').style.display = 'block';
        fadeIn('overlayDdd', 1.5);
    }

    //escrevendo DDD
    function dddValue() {
        if (this.innerHTML) {
            numDdd = this.innerHTML;
        } else {
            numDdd = this.event.srcElement.innerHTML;
        }


        document.getElementById('atual').innerHTML = '<p>' + numDdd + '</p>';
        //criando cookies
        docCookies.setItem("ddd", numDdd);
        docCookies.setItem("DDD", numDdd);
        window.currentDDD = numDdd;
        
        if (!window.isRegionalized) {
            window.decodeCidade = helpers.getCookie('cidade');
            window.regional = decodeURI(window.decodeCidade);
            window.userReg = helpers.getCookie('estado');
            var reg = new Regionalization();
            reg.initRegionalization();
            console.log( "init regionalization from ddds" );
        }
        

        // regionaliza();
        escondeLb('overlayDdd');

    }

    if (window.location.host == "www.vivo.com.br") {
        for (i = 0; i < selectDdd.length; i++) {
            var option = selectDdd[i];
            if (option.addEventListener) {
                option.addEventListener('click', dddValue);
            } else if (option.attachEvent) {
                option.attachEvent('onclick', dddValue);
            }
        }
    }

    function mostraLb(id) {
        document.getElementById(id).style.display = 'block';
        fadeIn(id, 1.5);
    }

    function escondeLb(id) {
        fadeOut(id, 1.5, function(target) {
            target.style.display = 'none';
        });
    }

    //animação lightbox
    function fadeOut(id, time, callback) {
        fade(id, time, 100, 0, callback);
    }

    function fadeIn(id, time, callback) {
        fade(id, time, 0, 100, callback);
    }

    function fade(id, time, ini, fin, callback) {
        var target = document.getElementById(id);
        var alpha = ini;
        var inc;
        if (fin >= ini) {
            inc = 5;
        } else {
            inc = -5;
        }
        var i = setInterval(
            function() {
                if ((inc > 0 && alpha >= fin) || (inc < 0 && alpha <= fin)) {
                    clearInterval(i);

                    if (typeof callback == 'function') {
                        callback(target);
                    }
                }
                setAlpha(target, alpha);
                alpha += inc;
            }, time);
    }

    function setAlpha(target, alpha) {
        target.style.filter = "alpha(opacity=" + alpha + ")";
        target.style.opacity = alpha / 100;
    }

});

function regionalizaPortal() {
    $('#listaDdd li').bind('click', function(e) {
        
    });
}
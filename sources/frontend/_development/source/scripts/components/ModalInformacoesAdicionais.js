class ModalnformacoesAdicionais {
    constructor() {
        var that = this;
        this.tabChange(1);
        
        $(".modal-header > .modal-close-button").click(function () {
            that.hideModal();
        });

        $(".tab_modal").click(function (e) {
            var current = $(e.currentTarget).data('choose');
            that.tabChange(current);
        });
    }

    setContent(critico, isR4) {
        let regulamento = "";
        let franquia = "";
        
        // a Regional de SC + DDD 42 (PR) é status critico = true porém contém informações diferentes na aba de franquia e no primeiro link da aba de regulamento
        if(isR4) {
            regulamento += 
            `<li>
                <a class="regulamento" href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_236545" target="_blank">
                    PROMOÇÃO VIVO CONTROLE GIGA XII 
                </a>
            </li>`;

            franquia +=
            `<ul>
            <li>A franquia de internet é válida pelo período de um mês;</li>
            <li>Após atingir o limite de dados do plano contratado, a internet será interrompida até a renovação do seu benefício, que é renovado mensalmente;</li>
            <li>As ligações ilimitadas são válidas para chamadas locais e longa distância usando o <strong>código 15</strong> para qualquer Vivo, celular ou fixo de outras operadoras;</li>
            </ul>`;

        } else {
            let currentDDD = this.getCookie('controle_ddd');

            if(currentDDD == 42 || currentDDD == 47 || currentDDD == 48 || currentDDD == 49){
                regulamento += 
            regulamento += 
                regulamento += 
                `<li>
                    <a class="regulamento" href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_236545" target="_blank">
                        PROMOÇÃO VIVO CONTROLE GIGA XII 
                    </a>
                </li>`;
            } else {
                regulamento += 
                `<li>
                    <a class="regulamento" href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766" target="_blank">
                        PROMOÇÃO VIVO CONTROLE DIGITAL VIII
                    </a>
                </li>`;
            }

            // franquia +=
            // `<ul>
            // <li>A franquia de internet é válida pelo período de um mês;</li>
            // <li>Após atingir o limite de dados do plano contratado, a internet será interrompida até a renovação do seu benefício, que é renovado mensalmente;</li>
            // <li>As ligações são ilimitadas para chamadas locais e longa distância usando o <strong>código 15</strong> para qualquer Vivo ou fixo;</li>
            // <li>As ligações locais para celulares de outras operadoras são ilimitadas;</li>
            // <li>As chamadas de longa distância com o <strong>código 15</strong> para celulares de outras operadoras têm o valor de R$0,50/minuto;</li>
            // </ul>`;

            franquia +=
            `<ul>
            <li>A franquia de internet é válida pelo período de um mês;</li>
            <li>Após atingir o limite de dados do plano contratado, a internet será interrompida até a renovação do seu benefício, que é renovado mensalmente;</li>
            <li>As ligações ilimitadas são válidas para chamadas locais e longa distância usando o <strong>código 15</strong> para qualquer Vivo, celular ou fixo de outras operadoras;</li>
            </ul>`;
        }

        if (critico !== true) {
            $(".tab__content[data-main-content=1]").html(`<ul>
            <li>Serviços sujeitos a disponibilidade, interrupções e análise de crédito;</li>
            <li>Para navegar com a velocidade 4G você precisa ter um aparelho 4G, um chip 4G, um plano 4G e estar na cobertura 4G;</li>
            <li>Velocidade máxima da internet disponível de até 5Mbps para download e 500Kbps para upload;</li>
            <li>A navegação nos apps de conteúdo inclusos nos planos é descontada da franquia de internet;</li>
            <li>Para receber ligações a cobrar é necessário ter saldo de recarga;</li>
            <li>Plano sem prazo de permanência mínima, exceto em compra de aparelho móvel com desconto;</li>
            <li>O valor desta oferta é promocional e válida por prazo fixo e determinado. Ao término do prazo de sua vigência, a Vivo poderá encerrar a promoção, prorrogar sua vigência ou estabelecer novo valor promocional.</li>
            </ul>`);

            $(".tab__content[data-main-content=2]").html(`<ul>
            <li>A franquia de internet é válida pelo período de um mês;</li>
            <li>Após atingir o limite de dados do plano contratado, a internet será interrompida até a renovação do seu benefício, que é renovado mensalmente;</li>
            <li>As ligações são ilimitadas para chamadas locais e longa distância usando o <strong>código 15</strong> para qualquer Vivo ou fixo;</li>
            <li>As ligações locais para celulares de outras operadoras são ilimitadas;</li>
            <li>As chamadas de longa distância com o <strong>código 15</strong> para celulares de outras operadoras têm o valor de R$0,50/minuto;</li>
            </ul>`)

            $(".tab__content[data-main-content=3]").html(`<ul>
            <li>
                <a class="regulamento" href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766" target="_blank">
                    PROMOÇÃO VIVO CONTROLE DIGITAL VIII
                </a>
            </li>
            <li>
                <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_238923" target="_blank">
                    Pacote Internet 150MB e 400MB
                </a>
            </li>
            <li>
                <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_238924" target="_blank">
                    Pacote 100min Outras Operadoras
                </a>
            </li>
            <li>
                <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_238925" target="_blank">
                    Pacote Vivo Internet Noite
                </a>
            </li>
            <li>
                <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_238926" target="_blank">
                    Pacote Vivo Internet Fim de Semana
                </a>
            </li>
            <li>
                <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_238927" target="_blank">
                    Pacote Vivo Internet Redes Sociais 1GB
                </a>
            </li>
            <li>
                <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_265081" target="_blank">
                Regulamento Pacote Recorrente Controle
                </a>
            </li>
            </ul>`)

            $(".tab__content[data-main-content=4]").html(`
            <p>Para mais informações sobre o Plano de Serviço ofertado, regulamento vigente, preços e critérios de reajuste, contrato de prestação de serviço, dentre outras informações, <a href="https://www.vivo.com.br/portalweb/appmanager/env/web?_nfls=false&_nfpb=true&_pageLabel=P115000498271489154631147&WT.ac=portal.movel.planosdeservicoemvigormovel.planoscontrole.listagemdeplanoscontrole#" target="_blank">clique aqui</a></p>
            `)

        }
        else {
            $(".tab__content[data-main-content=1]").html(`<ul>
            <li>Serviços sujeitos a disponibilidade, interrupções e análise de crédito;</li>
            <li>Para navegar com a velocidade 4G você precisa ter um aparelho 4G, um chip 4G, um plano 4G e estar na cobertura 4G;</li>
            <li>Velocidade máxima da internet disponível de até 5Mbps para download e 500Kbps para upload;</li>
            <li>A navegação nos apps de conteúdo inclusos nos planos é descontada da franquia de internet;</li>
            <li>Para receber ligações a cobrar é necessário ter saldo de recarga;</li>
            <li>Plano sem prazo de permanência mínima, exceto em compra de aparelho móvel com desconto;</li>
            <li>O valor desta oferta é promocional e válida por prazo fixo e determinado. Ao término do prazo de sua vigência, a Vivo poderá encerrar a promoção, prorrogar sua vigência ou estabelecer novo valor promocional.</li>
            </ul>`)

            $(".tab__content[data-main-content=2]").html(franquia);

            $(".tab__content[data-main-content=3]").html(`<ul>
            ${regulamento}
            <li>
                <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_238923" target="_blank">
                    Pacote Internet 150MB e 400MB
                </a>
            </li>
            <li>
                <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_238924" target="_blank">
                    Pacote 100min Outras Operadoras
                </a>
            </li>
            <li>
                <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_238925" target="_blank">
                    Pacote Vivo Internet Noite
                </a>
            </li>
            <li>
                <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_238926" target="_blank">
                    Pacote Vivo Internet Fim de Semana
                </a>
            </li>
            <li>
                <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_238927" target="_blank">
                    Pacote Vivo Internet Redes Sociais 1GB
                </a>
            </li>
            <li>
                <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_265082" target="_blank">
                    Vivo Controle Digital VIII
                </a>
            </li>
            <li>
                <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_265083" target="_blank">
                    Regulamento Pacote Recorrente Controle
                </a>
            </li>
            </ul>`)

            $(".tab__content[data-main-content=4]").html(`
            <p>Para mais informações sobre o Plano de Serviço ofertado, regulamento vigente, preços e critérios de reajuste, contrato de prestação de serviço, dentre outras informações, <a href="https://www.vivo.com.br/portalweb/appmanager/env/web?_nfls=false&_nfpb=true&_pageLabel=P115000498271489154631147&WT.ac=portal.movel.planosdeservicoemvigormovel.planoscontrole.listagemdeplanoscontrole#" target="_blank">clique aqui</a></p>
            `)
        }
    }

    tabChange(current) {
        $(".tab__item").removeClass("active");
        $(".tab__content[data-main-content]").hide();
        $(".tab__content[data-main-content=" + current + "]").show();
        $(".tab__item[data-choose=" + current + "]").addClass("active");
    }

    showModal() {
        $("#modalInformacoesAdicionais").show();
        $("html, body").css("overflow", "hidden");
        setTimeout(() => {
            $("#modalInformacoesAdicionais .modal-content").addClass('active');
        }, 100);
    }

    hideModal() {
        setTimeout(() => {
            $("#modalInformacoesAdicionais .modal-content").removeClass('active');
        }, 600);
        $("#modalInformacoesAdicionais").hide();
        $("html, body").css("overflow", "auto");
    }

    addUrlRegulamento(name, url) {
        $('.tab__content[data-main-content=3] a.regulamento').attr('href', url);
        $('.tab__content[data-main-content=3] a.regulamento').html(name);
    }

    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}

export default ModalnformacoesAdicionais;

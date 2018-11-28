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

    setContent(critico) {
        if (critico === true) {
            $(".tab__content[data-main-content=1]").html(`<ul>
            <li>Serviços sujeitos a disponibilidade, interrupções e análise de crédito;</li>
            <li>Para navegar com a velocidade 4G você precisa ter uma aparelho 4G, um chip 4G, um plano 4G e estar na cobertura 4G;</li>
            <li>Velocidade máxima da internet disponível de até 5Mbps para download e 500Kbps para upload;</li>
            <li>A navegação nos apps de conteúdo inclusos nos planos é descontada da franquia de internet;</li>
            <li>Para receber ligações a cobrar é necessário ter saldo de recarga;</li>
            <li>Plano sem prazo de permanência mínima, exceto em compra de aparelho móvel com desconto;</li>
            <li>O valor desta oferta é promocional e válida por prazo fixo e determinado. Ao término do prazo de sua vigência, a Vivo poderá encerrar a promoção, prorrogar sua vigência ou estabelecer novo valor promocional.</li>
            </ul>`);

            $(".tab__content[data-main-content=2]").html(`<ul>
            <li>A franquia de internet é válida pelo período de um mês;</li>
            <li>Após atingir o limite de dados do plano contratado, a internet será interrompida até a renovação do seu benefício, que é renovado mensalmente;</li>
            <li>As ligações ilimitadas são válidas para chamadas locais e longa distância usando o <strong>código 15</strong> para qualquer Vivo, celular ou fixo de outras operadoras;</li>
            </ul>`);

            $(".tab__content[data-main-content=3]").html(`<ul>
            <li><a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766&_ga=2.191488042.1447250500.1543240775-316014106.1543240775">Regulamento www.vivo.com.br/</a></li> 
            </ul>`)

        } 
        
        else {
            $(".tab__content[data-main-content=1]").html(`<ul>
            <li>Serviços sujeitos a disponibilidade, interrupções e análise de crédito;</li>
            <li>Para navegar com a velocidade 4G você precisa ter uma aparelho 4G, um chip 4G, um plano 4G e estar na cobertura 4G;</li>
            <li>Velocidade máxima da internet disponível de até 5Mbps para download e 500Kbps para upload;</li>
            <li>A navegação nos apps de conteúdo inclusos nos planos é descontada da franquia de internet;</li>
            <li>Para receber ligações a cobrar é necessário ter saldo de recarga;</li>
            <li>Plano sem prazo de permanência mínima, exceto em compra de aparelho móvel com desconto;</li>
            <li>O valor desta oferta é promocional e válida por prazo fixo e determinado. Ao término do prazo de sua vigência, a Vivo poderá encerrar a promoção, prorrogar sua vigência ou estabelecer novo valor promocional.</li>
            </ul>`)

            $(".tab__content[data-main-content=2]").html(`<ul>
            <li>A franquia de internet é válida pelo período de um mês;</li>
            <li>Após atingir o limite de dados do plano contratado, a internet será interrompida até a renovação do seu benefício, que é renovado mensalmente;</li>
            <li>As ligações são ilimitadas para chamadas locais e longa distância usando o <strong>código 15</strong> para qualquer Vivo ou fixo;</li>
            <li>As ligações locais para celulares de outras operadoras são ilimitadas;</li>
            <li>As chamadas de longa distância com o <strong>código 15</strong> para celulares de outras operadoras têm o valor de R$0,50/minuto;</li>
            </ul>`)

            $(".tab__content[data-main-content=3]").html(`<ul>
            <li><a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_138766&_ga=2.191488042.1447250500.1543240775-316014106.1543240775">Regulamento www.vivo.com.br/</a></li>
            </ul>`)
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
        TweenMax.fromTo($("#modalInformacoesAdicionais .modal-dialog"), 0.6, {
            x: "100%"
        }, {
            x: "0%",
            ease: SlowMo.easeInOut
        });
    }

    hideModal() {
        $("#modalInformacoesAdicionais").hide();
        $("html, body").css("overflow", "auto");
    }
}

export default ModalnformacoesAdicionais;

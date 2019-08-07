class ModalnformacoesAdicionais {
    constructor() {
        var that = this;
        this.tabChange(1);

        $(".modal-header > .modal-close-button").click(function() {
            that.hideModal();
        });

        $(".tab_modal").click(function(e) {
            var current = $(e.currentTarget).data("choose");
            that.tabChange(current);
        });
    }

    setContent(category) {
        let currentDDD = this.getCookie("controle_ddd");
        console.log(currentDDD);

        if (category === "anual") {
            $(".tab__content[data-main-content=1]").html(`
                    <ul>
                        <li>Serviços sujeitos a disponibilidade, interrupções e análise de crédito;</li>
                        <li>Para navegar com a velocidade 4G você precisa ter um aparelho 4G, um chip 4G, um plano 4G e estar na cobertura 4G;</li>
                        <li>Velocidade máxima da internet disponível de até 5Mbps para download e 500Kbps para upload;</li>
                        <li>A navegação nos apps de conteúdo inclusos nos planos é descontada da franquia de internet;</li>
                        <li>Para receber ligações a cobrar é necessário ter saldo de recarga;</li>
                    </ul>
                `);

            $(".tab__content[data-main-content=2]").html(`
                <ul>
                    <li>A franquia de internet é válida pelo período de um mês;</li>
                    <li>Após atingir o limite de dados do plano contratado, a internet será interrompida até a renovação do seu benefício, que é renovado mensalmente;</li>
                    <li>As ligações são ilimitadas para chamadas locais e longa distância usando o <strong>código 15</strong> para qualquer Vivo ou fixo;</li>
                    <li>As ligações locais para celulares de outras operadoras são ilimitadas;</li>
                </ul>
                `);
            $(".tab__content[data-main-content=3]").html(`
                    <ul>
                        <li>
                            <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_255754" target="_blank">
                                Pacote Vivo Gigas para Redes Sociais
                            </a>
                        </li>
                        <li>
                            <a href="https://celular.vivo.com.br/planos/controle/regulamentos/Regulamento-Vivo-Controle-Nacional-Anual.pdf" target="_blank">
                                Regulamento Controle
                            </a>
                        </li>
                    </ul>
                `);
        }

        if (category === "mensal") {
            $(".tab__content[data-main-content=1]").html(`
                    <ul>
                        <li>Serviços sujeitos a disponibilidade, interrupções e análise de crédito;</li>
                        <li>Para navegar com a velocidade 4G você precisa ter um aparelho 4G, um chip 4G, um plano 4G e estar na cobertura 4G;</li>
                        <li>Velocidade máxima da internet disponível de até 5Mbps para download e 500Kbps para upload;</li>
                        <li>A navegação nos apps de conteúdo inclusos nos planos é descontada da franquia de internet;</li>
                        <li>Para receber ligações a cobrar é necessário ter saldo de recarga;</li>
                        <li>Plano sem prazo de permanência mínima, exceto em compra de aparelho móvel com desconto;</li>
                    </ul>
                `);

            $(".tab__content[data-main-content=2]").html(`
                <ul>
                    <li>A franquia de internet é válida pelo período de um mês;</li>
                    <li>Após atingir o limite de dados do plano contratado, a internet será interrompida até a renovação do seu benefício, que é renovado mensalmente;</li>
                    <li>As ligações são ilimitadas para chamadas locais e longa distância usando o <strong>código 15</strong> para qualquer Vivo ou fixo;</li>
                    <li>As ligações locais para celulares de outras operadoras são ilimitadas;</li>
                    <li>As chamadas de longa distância com o <strong>código 15</strong> para celulares de outras operadoras têm o valor de R$0,50/minuto;</li>
                </ul>
                `);

            $(".tab__content[data-main-content=3]").html(`
                    <ul>
                        <li>
                            <a href="https://www.vivo.com.br/portalweb/ShowPropertyServlet?nodeId=/UCMRepository/CONTRIB_255754" target="_blank">
                                Pacote Vivo Gigas para Redes Sociais
                            </a>
                        </li>
                        <li>
                            <a href="https://celular.vivo.com.br/planos/controle/regulamentos/Regulamento-Controle-Nacional-Anual.pdf" target="_blank">
                                Regulamento Controle
                            </a>
                        </li>
                    </ul>
                `);
        }

        $(".tab__content[data-main-content=4]").html(`
            <p>
                Para mais informações sobre o Plano de Serviço ofertado, regulamento vigente, preços e critérios de reajuste, contrato de 
                prestação de serviço, dentre outras informações, <a href="https://www.vivo.com.br/portalweb/appmanager/env/web?_nfls=false&amp;_nfpb=true&amp;_pageLabel=P115000498271489154631147&amp;WT.ac=portal.movel.planosdeservicoemvigormovel.planoscontrole.listagemdeplanoscontrole#" target="_blank">clique aqui</a>
            </p>
        `);
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
            $("#modalInformacoesAdicionais .modal-content").addClass("active");
        }, 100);
    }

    hideModal() {
        setTimeout(() => {
            $("#modalInformacoesAdicionais .modal-content").removeClass("active");
        }, 600);
        $("#modalInformacoesAdicionais").hide();
        $("html, body").css("overflow", "auto");
    }

    addUrlRegulamento(name, url) {
        $(".tab__content[data-main-content=3] a.regulamento").attr("href", url);
        $(".tab__content[data-main-content=3] a.regulamento").html(name);
    }

    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
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

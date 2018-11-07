var plansControle = [
    // nacional
    new Plan({
        region: regions.nacional,
        internet: '4GB',
        mainoffer: true,
        appname: "vivocontrolenba",
        SKU: ['VC00031', 'VIVOCTRLF29N'],
        combo: "<br>GoRead - NBA - Sync - Kantoo - Vivo Guru",
        portal: false,
        price: {
            amount: 89.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.nacional,
        internet: '3GB',
        mainoffer: true,
        appname: "vivocontrolekantoo",
        SKU: ['VC00030', 'VIVOCTRLF28N'],
        combo: "<br>GoRead - NBA - Sync - Kantoo",
        portal: false,
        price: {
            amount: 59.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.nacional,
        internet: '2GB',
        mainoffer: true,
        SKU: ['VC00028', 'VIVOCTRLF27N'],
        combo: "<br>GoRead - NBA - Sync",
        portal: false,
        appname: "vivocontrolegoread",
        price: {
            amount: 44.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: regions.nacional,
        internet: '2GB',
        SKU: ['VC00027', 'VIVOCTRLF26N'],
        mainoffer: true,
        portal: false,
        price: {
            amount: 42.99,
            discount: 0,
            perLine: 0
        }
    }),

    // criticos, NE e 21
    new Plan({
        region: [regions.criticos, regions.ddd21, regions.ne],
        internet: '5GB',
        mainoffer: true,
        appname: "vivocontrolenba",
        SKU: ['VC00031', 'VIVOCTRLF29A'],
        combo: "<br>GoRead - NBA - Sync - Kantoo - Vivo Guru",
        portal: false,
        price: {
            amount: 89.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: [regions.criticos, regions.ddd21, regions.ne],
        internet: '4GB',
        mainoffer: true,
        appname: "vivocontrolekantoo",
        SKU: ['VC00031', 'VIVOCTRLF28A'],
        combo: "<br>GoRead - NBA - Sync - Kantoo",
        portal: false,
        price: {
            amount: 59.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: [regions.criticos, regions.ddd21, regions.ne],
        internet: '3GB',
        mainoffer: true,
        appname: "vivocontrolegoread",
        SKU: ['VC00029', 'VIVOCTRLF27A'],
        combo: "<br>GoRead - NBA - Sync",
        portal: false,
        price: {
            amount: 44.99,
            discount: 0,
            perLine: 0
        }
    }),
    new Plan({
        region: [regions.criticos, regions.ddd21, regions.ne],
        internet: '3GB',
        SKU: ['', 'VIVOCTRLF26A'],
        portal: false,
        price: {
            amount: 42.99,
            discount: 0,
            perLine: 0
        },
        linkCTA: ['Contratar', 'https://lojaonline.vivo.com.br/vivostorefront/bundle/view-plans/1?userActionPlanOption=newPlanAcquisition&platform=CONTROLE']
    })

];

plansControle = new RegionItems(plansControle);
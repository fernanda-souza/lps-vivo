var regions = require('./regions.js').regions;

var RegionItems = (function() {
    var _addItem = function(region, item, items) {

        if ((!isArray(region)) && typeof region !== "string" && typeof region !== "number") {
            throw new TypeError("region must be a string, number or array");
        } else if (isArray(region)) {
            for (var j = 0, len = region.length; j < len; j++) {
                _addItem(region[j], item, items);
            }
        } else {
            if (!items.hasOwnProperty(region)) {
                items[region] = [];
            }

            items[region].push(item);
        }
    };

    RegionItems = function RegionItems(items) {
        this._region_items = {};

        for (var i = 0, len = items.length; i < len; i++) {

            var item = items[i];

            if (!item.hasOwnProperty("region")) throw new TypeError("missing error property");

            var region = item.region;

            _addItem(region, item, this._region_items);
        }

        var regexInt = /(^\d+)/;

        for (var key in this._region_items) {
            if (!this._region_items.hasOwnProperty(key)) continue;
            if (!isArray(this._region_items[key])) continue;
            this._region_items[key].sort(function(a, b) {
                if (!("internet" in a || "internet" in b)) return 0;
                var quantiaA = a.internet.match(regexInt);
                var quantiaB = b.internet.match(regexInt);

                if (!(quantiaA || quantiaB)) return 0;
                quantiaA = +quantiaA;
                quantiaB = +quantiaB;
                if (quantiaA < quantiaB) return -1;
                else if (quantiaA > quantiaB) return 1;
                return 0;
            });
        }
    };

    RegionItems.prototype.get = function(key) {
        return this._region_items[key];
    };

    RegionItems.prototype.toJSON = function() {
        return this._region_items;
    };

    return RegionItems;
}());

var Plan = (function() {
    Plan = function Plan(data) {
        for (var key in data) {
            if (!data.hasOwnProperty(key)) continue;

            this[key] = data[key];
        }
    };

    Plan.prototype.toJSON = function() {
        var o = {};

        for (key in this) {
            if (!this.hasOwnProperty(key)) continue;
            o[key] = this[key];
        }

        return o;
    };

    Plan.prototype.getPriceFull = function() {
        return this.price.amount;
    };

    Plan.prototype.getPrice = function() {
        var calcPrice = Math.round((this.price.amount - this.price.discount) * 100) / 100;
        return calcPrice.toFixed(2);
    };

    return Plan;
}());

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
]

plansControle = new RegionItems(plansControle);
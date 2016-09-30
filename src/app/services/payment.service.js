"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
require('rxjs/add/operator/map');
const ng2_cache_1 = require('ng2-cache/ng2-cache');
let PaymentService = class PaymentService {
    constructor(_http, _cacheService) {
        this._http = _http;
        this._cacheService = _cacheService;
        this._url = "http://52.43.46.127:80/api/payment/";
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster');
    }
    payuCheckSum(txnId, amount, productInfo, firstname, email) {
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.post(this._url + "payu_checksum", JSON.stringify({ txnin: txnId,
            amount: amount, productInfo: productInfo, firstname: firstname, email: email }), { headers: myHeader })
            .map((res) => res.json());
    }
    getOrderId(amount, roost) {
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.post(this._url + "orderid", JSON.stringify({ amount: amount, roost: roost }), { headers: myHeader })
            .map((res) => res.json());
    }
    getWallet() {
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "my_wallet", { headers: myHeader })
            .map((res) => res.json());
    }
};
PaymentService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, ng2_cache_1.CacheService])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map
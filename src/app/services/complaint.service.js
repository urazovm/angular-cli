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
require('rxjs/add/operator/map');
const http_1 = require('@angular/http');
const ng2_cache_1 = require('ng2-cache/ng2-cache');
let ComplaintsService = class ComplaintsService {
    constructor(_http, _cacheService) {
        this._http = _http;
        this._cacheService = _cacheService;
        this.url = "http://52.43.46.127:80/api/roost/complaints/";
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster');
    }
    createAuthorizationHeader(headers) {
        headers.append('Authorization', this.accessToken);
        headers.append('Content-Type', 'text/plain');
    }
    getAllComplaints(page) {
        var url = this.url;
        if (null != page)
            url += "?page=" + page;
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this.url, { headers: myHeader })
            .map((res) => res.json());
    }
    postComplaints() {
        return this._http.post(this.url, null)
            .map(res => res.json());
    }
};
ComplaintsService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, ng2_cache_1.CacheService])
], ComplaintsService);
exports.ComplaintsService = ComplaintsService;
//# sourceMappingURL=complaint.service.js.map
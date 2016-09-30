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
let SessionService = class SessionService {
    constructor(_http, _cacheService) {
        this._http = _http;
        this._cacheService = _cacheService;
        this._url = "http://52.43.46.127:80/api/session/";
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster');
    }
    getRequestOptions(params) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        if (null == params) {
            return new http_1.RequestOptions({ headers: headers });
        }
        return new http_1.RequestOptions({ headers: headers, search: params });
    }
    requestPin(mobileNumber) {
        return this._http.post(this._url + "request_pin", JSON.stringify({ mobile_number: mobileNumber }))
            .map(res => res);
    }
    verifyPin(mobileNumber, otp) {
        return this._http.post(this._url + "verify_pin", JSON.stringify({ mobile_number: mobileNumber, auth_token: otp }))
            .map(res => res);
    }
    registerUser(facebook_id, facebook_token, first_name, last_name, gender, email, dob, profile_image, mobile) {
        return this._http.post(this._url + "register", JSON.stringify({ facebook_id: facebook_id,
            facebook_token: facebook_token,
            name: first_name, surname: last_name,
            email: email,
            dob: dob,
            gender: gender,
            mobile_number: mobile }), this.getRequestOptions())
            .map(res => res.json());
    }
    loginUser(facebook_id, facebook_token) {
        return this._http.post(this._url + "register", JSON.stringify({ facebook_id: facebook_id,
            facebook_token: facebook_token }), this.getRequestOptions())
            .map((res) => res.json());
    }
    logOutUser() {
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        console.log(this._cacheService.get('accessTokenRooster'));
        console.log(this.accessToken);
        return this._http.delete(this._url + "logout", { headers: myHeader })
            .map((res) => res.json());
    }
};
SessionService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, ng2_cache_1.CacheService])
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map
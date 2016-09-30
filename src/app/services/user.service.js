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
const Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
const ng2_cache_1 = require('ng2-cache/ng2-cache');
let UserService = class UserService {
    constructor(_http, _cacheService) {
        this._http = _http;
        this._cacheService = _cacheService;
        this._url = "http://52.43.46.127:80/api/user/";
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster');
    }
    createAuthorizationHeader(headers) {
        headers.append('Authorization', this.accessToken);
    }
    updateProfilePic(profile_image) {
        return Observable_1.Observable.create(observer => {
            let formData = new FormData(), xhr = new XMLHttpRequest();
            formData.append("profile_image", profile_image);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.open('PATCH', this._url + 'profile', true);
            xhr.setRequestHeader('Authorization', this.accessToken);
            xhr.send(formData);
        });
    }
    updateProfile(facebook_id, facebook_token, first_name, last_name, gender, email, dob, mobile, profile_image) {
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        myHeader.append('Content-Type', 'application/json');
        return this._http.patch(this._url + "profile", JSON.stringify({ facebook_id: facebook_id,
            facebook_token: facebook_token,
            name: first_name,
            surname: last_name,
            email: email,
            dob: dob,
            gender: gender,
            mobile_number: mobile,
            profile_image: profile_image }), { headers: myHeader })
            .map(res => res.json());
    }
    getUserInfo(id) {
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "info/" + id, { headers: myHeader })
            .map((res) => res.json());
    }
    getUserNotifications() {
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "notifications", { headers: myHeader })
            .map((res) => res.json());
    }
};
UserService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, ng2_cache_1.CacheService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
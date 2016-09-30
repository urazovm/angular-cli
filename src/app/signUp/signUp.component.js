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
const common_1 = require('@angular/common');
const forms_1 = require('@angular/forms');
const input_1 = require('@angular2-material/input');
const toolbar_1 = require('@angular2-material/toolbar');
const user_1 = require('../shared/user');
const session_service_1 = require('../services/session.service');
const http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
const ng2_facebook_sdk_1 = require('ng2-facebook-sdk');
const ng2_cache_1 = require('ng2-cache/ng2-cache');
let SignUpComponent = class SignUpComponent {
    constructor(formBuilder, sessionService, _cacheService, user, fb) {
        this.sessionService = sessionService;
        this._cacheService = _cacheService;
        this.user = user;
        this.fb = fb;
        let fbParams = {
            appId: '1720733194853739',
            xfbml: true,
            version: 'v2.7'
        };
        this.fb.init(fbParams);
    }
    ngOnInit() {
    }
    onFacebookSignUpClick() {
        this.fb.login().then((response) => {
            this._cacheService.set('userIdFB', response.authResponse.userID);
            this._cacheService.set('accessTokenFB', response.authResponse.accessToken);
            this.statusChangeCallback(response);
            ((error) => console.error(error));
        });
    }
    statusChangeCallback(resp) {
        console.log(resp);
        this.sessionService.registerUser(resp.authResponse.userID, resp.authResponse.accessToken, this.user.first_name, this.user.last_name, this.user.gender, this.user.email, this.parseDate(this.user.dob))
            .subscribe(res => {
            this.response = res;
        });
        console.log(this.response);
    }
    ;
    parseDate(date) {
        if (null != date) {
            var res = date.split("/");
            return res[2] + "-" + res[1] + "-" + res[0];
        }
    }
};
SignUpComponent = __decorate([
    core_1.Component({
        selector: 'facebook-login',
        templateUrl: 'app/signUp/facebook-register.html',
        directives: [toolbar_1.MdToolbar, input_1.MD_INPUT_DIRECTIVES, common_1.CORE_DIRECTIVES, forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES],
        providers: [forms_1.FormBuilder, user_1.User, session_service_1.SessionService, http_1.HTTP_PROVIDERS]
    }), 
    __metadata('design:paramtypes', [forms_1.FormBuilder, session_service_1.SessionService, ng2_cache_1.CacheService, user_1.User, (typeof (_a = typeof ng2_facebook_sdk_1.FacebookService !== 'undefined' && ng2_facebook_sdk_1.FacebookService) === 'function' && _a) || Object])
], SignUpComponent);
exports.SignUpComponent = SignUpComponent;
var _a;
//# sourceMappingURL=signUp.component.js.map
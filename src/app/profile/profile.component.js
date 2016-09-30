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
const router_1 = require('@angular/router');
const http_1 = require('@angular/http');
const forms_1 = require('@angular/forms');
const input_1 = require('@angular2-material/input');
const toolbar_1 = require('@angular2-material/toolbar');
const ng2_cache_1 = require('ng2-cache/ng2-cache');
const notifications_service_1 = require('../notifications/notifications.service');
const user_service_1 = require('../services/user.service');
const user_1 = require('../shared/user');
let ProfileComponent = class ProfileComponent {
    constructor(_userService, _cache, _router, userProfile, _notificationService) {
        this._userService = _userService;
        this._cache = _cache;
        this._router = _router;
        this.userProfile = userProfile;
        this._notificationService = _notificationService;
        this.header = "Profile page";
        if (null == this._cache.get('accessTokenRooster')) {
            this._router.navigate(['home']);
        }
    }
    ngOnInit() {
        this.getUserInfo();
    }
    imgChangeEvent(fileInput) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#profilePic').attr('src', e.target.result);
            };
            reader.readAsDataURL(fileInput.target.files[0]);
            this.userProfile.profile_image = fileInput.target.files[0];
            console.log(fileInput.target.files[0]);
            this.savePofilePic(fileInput.target.files[0]);
        }
    }
    getUserInfo() {
        this._userService.getUserInfo(this._cache.get("userIdRooster"))
            .subscribe(profile => {
            console.log(profile);
            this.userProfile.first_name = profile.name;
            this.userProfile.last_name = profile.surname;
            this.userProfile.email = profile.email;
            this.userProfile.mobile_number = profile.mobile_number;
            this.userProfile.facebook_id = profile.facebook_id;
            this.userProfile.gender = profile.gender;
            this.userProfile.profile_image = profile.profile_image;
            console.log(profile.profile_image);
            this.userProfile.dob = this.reverseDate(profile.dob);
        });
    }
    savePofilePic(profile_image) {
        this._userService.updateProfilePic(profile_image)
            .subscribe(profile => {
            console.log(profile);
            this._notificationService.success('Profile Picture Updated Successfully', '');
            this._cache.set('userImg', profile.profile_image);
        });
    }
    saveProfile() {
        this._userService.updateProfile(this._cache.get("userIdFB"), this._cache.get("accessTokenFB"), this.userProfile.first_name, this.userProfile.last_name, this.userProfile.gender, this.userProfile.email, this.parseDate(this.userProfile.dob), this.userProfile.mobile_number)
            .subscribe(profile => {
            console.log(profile);
            this._notificationService.success('Profile Updated Successfully', '');
        });
    }
    parseDate(date) {
        if (null != date) {
            var res = date.split("/");
            return res[2] + "-" + res[1] + "-" + res[0];
        }
    }
    reverseDate(date) {
        if (null != date) {
            var res = date.split("-");
            return res[2] + "/" + res[1] + "/" + res[0];
        }
    }
};
ProfileComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/profile/profile.html',
        directives: [toolbar_1.MdToolbar, input_1.MD_INPUT_DIRECTIVES, common_1.CORE_DIRECTIVES,
            forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES],
        providers: [forms_1.FormBuilder, user_1.User, user_service_1.UserService, http_1.HTTP_PROVIDERS]
    }), 
    __metadata('design:paramtypes', [user_service_1.UserService, ng2_cache_1.CacheService, router_1.Router, user_1.User, notifications_service_1.NotificationsService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map
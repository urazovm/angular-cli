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
const router_1 = require('@angular/router');
const common_1 = require('@angular/common');
const http_1 = require('@angular/http');
const user_service_1 = require('./services/user.service');
const session_service_1 = require('./services/session.service');
const roost_service_1 = require('./services/roost.service');
const ng2_facebook_sdk_1 = require('ng2-facebook-sdk');
const ng2_cache_1 = require('ng2-cache/ng2-cache');
const sideNav_component_1 = require('./shared/sideNav.component');
const widget_component_1 = require('./shared/widget.component');
const roost_1 = require('./shared/roost');
const tag_1 = require('./shared/tag');
const googleplace_directive_1 = require('./shared/googleplace.directive');
const ng2_modal_1 = require('ng2-modal');
const notifications_service_1 = require('./notifications/notifications.service');
const URL = "http://52.43.46.127:80/api/roost";
let AppComponent = class AppComponent {
    constructor(sideNav, widget, _router, roostService, _cacheService, fb, _sessionService, userService, roost, _service) {
        this.sideNav = sideNav;
        this.widget = widget;
        this._router = _router;
        this.roostService = roostService;
        this._cacheService = _cacheService;
        this.fb = fb;
        this._sessionService = _sessionService;
        this.userService = userService;
        this.roost = roost;
        this._service = _service;
        this.searchText = '';
        this.showNotifications = false;
        this.needsToggle = false;
        this.isUserLoggedIn = false;
        this.title = "Please login to continue";
        this.options = {
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true,
            maxLength: 0,
            maxStack: 7,
            showProgressBar: true,
            pauseOnHover: true,
            preventDuplicates: false,
            preventLastDuplicates: "visible",
            rtl: false,
            animate: "scale",
            position: ["right", "bottom"]
        };
        let fbParams = {
            appId: '1730242673902791',
            xfbml: true,
            version: 'v2.7'
        };
        this.fb.init(fbParams);
        if (null != this._cacheService.get('accessTokenRooster')) {
            this.isUserLoggedIn = true;
            console.log(this._cacheService.get('accessTokenRooster'));
            this.firstName = this._cacheService.get('userFirstName');
            this.userImg = this._cacheService.get('userImg');
            this.userId = this._cacheService.get('userId');
            this.userService.getUserNotifications()
                .subscribe(notifications => {
                console.log(notifications);
                this.notificationCount = notifications.count;
                this.notifications = notifications.results;
            });
        }
    }
    ngOnInit() {
    }
    logout() {
        this._sessionService.logOutUser()
            .subscribe(response => {
            console.log(response);
        });
        this._router.navigate(['home']);
        this.sideNav.makeActive('Home');
        this._cacheService.removeAll();
        this.isUserLoggedIn = false;
    }
    imgChangeEvent(fileInput) {
        this.fileUploadType = 'IMG';
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#previewImg').attr('src', e.target.result);
            };
            reader.readAsDataURL(fileInput.target.files[0]);
            this.fileToUpload = fileInput.target.files[0];
        }
    }
    vidChangeEvent(fileInput) {
        this.fileUploadType = 'VID';
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#previewVid').attr('src', e.target.result);
            };
            reader.readAsDataURL(fileInput.target.files[0]);
            this.fileToUpload = fileInput.target.files[0];
        }
    }
    audChangeEvent(fileInput) {
        this.fileUploadType = 'AUD';
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#previewAud').attr('src', e.target.result);
            };
            reader.readAsDataURL(fileInput.target.files[0]);
            this.fileToUpload = fileInput.target.files[0];
        }
    }
    validatePromotions() {
        if (this.isUserLoggedIn == true) {
            this._router.navigate(['promotions']);
            this.sideNav.makeActive('Promotions');
        }
        else {
            this._service.error(this.title, '');
        }
    }
    validateComplaints() {
        if (this.isUserLoggedIn == true) {
            this._router.navigate(['complaints']);
            this.sideNav.makeActive('Complaints');
        }
        else {
            this._service.error(this.title, '');
        }
    }
    handleLogin() {
        this.fb.login().then((response) => {
            this._cacheService.set('userIdFB', response.authResponse.userID);
            this._cacheService.set('accessTokenFB', response.authResponse.accessToken);
            this.handleAppLogin();
            ((error) => console.error(error));
        });
    }
    handleAppLogin() {
        this._sessionService.loginUser(this._cacheService.get('userIdFB'), this._cacheService.get('accessTokenFB'))
            .subscribe(response => {
            this.isUserLoggedIn = true;
            console.log(JSON.stringify(response));
            this._cacheService.set('accessTokenRooster', response.token);
            this._cacheService.set('userIdRooster', response.user.id);
            this.firstName = response.user.name;
            console.log(this.firstName);
            this.lastName = response.user.surname;
            this.userImg = response.user.profile_image;
            this._cacheService.set('userFirstName', response.user.name);
            this._cacheService.set('userLastName', response.user.surname);
            this._cacheService.set('userImg', response.user.profile_image);
            this._cacheService.set('userId', response.user.id);
        });
    }
    getAddress(place) {
        this.address = place['formatted_address'];
        var location = place['geometry']['location'];
        this.latitude = location.lat();
        this.longitude = location.lng();
        console.log("Address Object", this.address);
        console.log("Latitude", this.latitude);
        console.log("Longitude", this.longitude);
    }
    triggerSearch(searchTxt) {
        console.log(searchTxt);
        this.setActiveFlagsFalse();
        this._router.navigate(['search', searchTxt]);
    }
    makeActive(path) {
        this.sideNav.makeActive(path);
    }
    togglePlus() {
        this.widget.togglePlus();
    }
    toggleAddButtons() {
        this.widget.toggleAddButtons();
    }
    showPromotionDiv() {
        this.widget.showPromotionDiv();
    }
    showComplaintDiv() {
        this.widget.showComplaintDiv();
    }
    closeWidget() {
        this.fileUploadType = null;
        this.widget.closeWidget();
    }
    setActiveFlagsFalse() {
        this.sideNav.setActiveFlagsFalse();
    }
    toggleNotifications() {
        this.needsToggle = !this.needsToggle;
        this.userService.getUserNotifications()
            .subscribe(response => {
            console.log(JSON.stringify(response));
        });
    }
    handleOffClick() {
        if (this.needsToggle == true) {
            this.showNotifications = !this.showNotifications;
            this.needsToggle = !this.needsToggle;
            return;
        }
        this.showNotifications = false;
    }
    submitRoost() {
        this.roost.title = this.complaintTitle;
        this.roost.location = this.address;
        this.roost.lat = this.latitude;
        this.roost.lng = this.longitude;
        this.roost.text = this.complaintDesc;
        this.roost.tags = this.tags;
        this.roost.type = this.widget.roostType;
        console.log(this.widget.roostType);
        this.roost.roost_media = this.fileToUpload;
        this.roost.media_type = this.fileUploadType;
        console.log(this.roost.roost_media);
        this.roostService.postRoost(this.roost)
            .subscribe(response => {
            console.log(response);
            this.widget.closeWidget();
            this._service.success('Successfully Posted', '');
        });
    }
    getTags() {
        var res = this.tags.split(" ");
        console.log(res.length);
        var tags = new Array();
        for (var i = 0; i < res.length; i++) {
            var t = new tag_1.Tag();
            t.id = i;
            t.tag = res[i];
            tags.push(t);
        }
        return tags;
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.html',
        directives: [router_1.ROUTER_DIRECTIVES, common_1.NgClass, common_1.NgStyle, ng2_modal_1.MODAL_DIRECTIVES,
            googleplace_directive_1.GoogleplaceDirective],
        providers: [user_service_1.UserService, roost_service_1.RoostService, session_service_1.SessionService, http_1.HTTP_PROVIDERS,
            ng2_facebook_sdk_1.FacebookService, sideNav_component_1.SideNavDisplay, widget_component_1.Widget, roost_1.Roost, ng2_modal_1.Modal]
    }), 
    __metadata('design:paramtypes', [sideNav_component_1.SideNavDisplay, widget_component_1.Widget, router_1.Router, roost_service_1.RoostService, ng2_cache_1.CacheService, (typeof (_a = typeof ng2_facebook_sdk_1.FacebookService !== 'undefined' && ng2_facebook_sdk_1.FacebookService) === 'function' && _a) || Object, session_service_1.SessionService, user_service_1.UserService, roost_1.Roost, notifications_service_1.NotificationsService])
], AppComponent);
exports.AppComponent = AppComponent;
var _a;
//# sourceMappingURL=app.component.js.map
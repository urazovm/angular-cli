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
const platform_browser_1 = require('@angular/platform-browser');
const forms_1 = require('@angular/forms');
const radio_1 = require('@angular2-material/radio');
const http_1 = require('@angular/http');
const angular2_in_memory_web_api_1 = require('angular2-in-memory-web-api');
const app_routing_1 = require('./app.routing');
const app_component_1 = require('./app.component');
const home_component_1 = require('./home/home.component');
const signUp_component_1 = require('./signUp/signUp.component');
const profile_component_1 = require('./profile/profile.component');
const roost_service_1 = require('./services/roost.service');
const session_service_1 = require('./services/session.service');
const ng2_cache_1 = require('ng2-cache/ng2-cache');
const promotion_service_1 = require('./services/promotion.service');
const payment_service_1 = require('./services/payment.service');
const complaint_service_1 = require('./services/complaint.service');
const user_service_1 = require('./services/user.service');
const config_service_1 = require('./services/config.service');
const ng2_pagination_1 = require('ng2-pagination');
const simple_notifications_module_1 = require('./notifications/simple-notifications.module');
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            simple_notifications_module_1.SimpleNotificationsModule,
            forms_1.FormsModule,
            app_routing_1.routing,
            http_1.HttpModule,
            radio_1.MdRadioModule
        ],
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            signUp_component_1.SignUpComponent,
            profile_component_1.ProfileComponent
        ],
        providers: [
            config_service_1.ConfigService,
            ng2_cache_1.CacheService,
            roost_service_1.RoostService,
            session_service_1.SessionService,
            promotion_service_1.PromotionsService,
            complaint_service_1.ComplaintsService,
            payment_service_1.PaymentService,
            user_service_1.UserService,
            ng2_pagination_1.PaginationService,
            { provide: http_1.XHRBackend, useClass: angular2_in_memory_web_api_1.InMemoryBackendService }
        ],
        bootstrap: [app_component_1.AppComponent]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
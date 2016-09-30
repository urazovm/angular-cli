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
const http_1 = require('@angular/http');
const ng2_cache_1 = require('ng2-cache/ng2-cache');
const ng2_pagination_1 = require('ng2-pagination');
const profileFeed_component_1 = require('../shared/profileFeed.component');
const roost_service_1 = require('../services/roost.service');
const promotion_service_1 = require('../services/promotion.service');
const notifications_service_1 = require('../notifications/notifications.service');
let PromotionsComponent = class PromotionsComponent extends profileFeed_component_1.ProfileFeed {
    constructor(_promotionService, _router, cacheService, roostService, notifyService) {
        super(roostService, cacheService, notifyService);
        this._promotionService = _promotionService;
        this._router = _router;
        this.cacheService = cacheService;
        this.roostService = roostService;
        this.notifyService = notifyService;
        this.header = "Complaints page";
        if (null == this.cacheService.get('accessTokenRooster')) {
            this._router.navigate(['home']);
        }
    }
    ngOnInit() {
        this.pageSize = 50;
        this.getPage();
    }
    getPage(page) {
        this._promotionService.getAllPromotions(page)
            .subscribe(feeds => {
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results;
            this.page = null != page ? page : this.page;
        });
    }
};
PromotionsComponent = __decorate([
    core_1.Component({
        selector: 'promotions',
        templateUrl: 'app/shared/profileFeed.component.html',
        directives: [ng2_pagination_1.PaginationControlsCmp],
        providers: [promotion_service_1.PromotionsService, http_1.HTTP_PROVIDERS, roost_service_1.RoostService],
        pipes: [ng2_pagination_1.PaginatePipe]
    }), 
    __metadata('design:paramtypes', [promotion_service_1.PromotionsService, router_1.Router, ng2_cache_1.CacheService, roost_service_1.RoostService, notifications_service_1.NotificationsService])
], PromotionsComponent);
exports.PromotionsComponent = PromotionsComponent;
//# sourceMappingURL=promotions.component.js.map
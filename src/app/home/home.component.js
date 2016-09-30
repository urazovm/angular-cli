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
const ng2_pagination_1 = require('ng2-pagination');
const ng2_cache_1 = require('ng2-cache/ng2-cache');
const profileFeed_component_1 = require('../shared/profileFeed.component');
const roost_service_1 = require('../services/roost.service');
const notifications_service_1 = require('../notifications/notifications.service');
let HomeComponent = class HomeComponent extends profileFeed_component_1.ProfileFeed {
    constructor(roostService, cacheService, notifyService) {
        super(roostService, cacheService, notifyService);
        this.roostService = roostService;
        this.cacheService = cacheService;
        this.notifyService = notifyService;
        this.header = "Home Page";
    }
    ngOnInit() {
        this.pageSize = 50;
        this.getPage();
    }
    getPage(page) {
        this.roostService.getFeeds(page)
            .subscribe(feeds => {
            console.log(feeds);
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results;
            this.page = null != page ? page : this.page;
        });
    }
};
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: 'app/shared/profileFeed.component.html',
        directives: [ng2_pagination_1.PaginationControlsCmp],
        providers: [roost_service_1.RoostService],
        pipes: [ng2_pagination_1.PaginatePipe]
    }), 
    __metadata('design:paramtypes', [roost_service_1.RoostService, ng2_cache_1.CacheService, notifications_service_1.NotificationsService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map
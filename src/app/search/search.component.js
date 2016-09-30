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
const router_1 = require('@angular/router');
const ng2_pagination_1 = require('ng2-pagination');
const ng2_cache_1 = require('ng2-cache/ng2-cache');
const profileFeed_component_1 = require('../shared/profileFeed.component');
const roost_service_1 = require('../services/roost.service');
const user_service_1 = require('../services/user.service');
const notifications_service_1 = require('../notifications/notifications.service');
let SearchComponent = class SearchComponent extends profileFeed_component_1.ProfileFeed {
    constructor(route, roostService, cacheService, _router, notifyService) {
        super(roostService, cacheService, notifyService);
        this.route = route;
        this.roostService = roostService;
        this.cacheService = cacheService;
        this._router = _router;
        this.notifyService = notifyService;
        this.sub = this.route.params
            .subscribe(params => {
            this.searchQry = params['searchKey'];
            if (null == this.searchQry || this.searchQry == '') {
                this._router.navigate(['home']);
            }
            this.triggerSearch();
        });
    }
    ngOnInit() {
        this.pageSize = 50;
    }
    triggerSearch() {
        this.roostService.search(this.searchQry)
            .subscribe(feeds => {
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results;
        }, error => this.errorMessage);
    }
};
SearchComponent = __decorate([
    core_1.Component({
        selector: 'search',
        templateUrl: 'app/shared/profileFeed.component.html',
        directives: [ng2_pagination_1.PaginationControlsCmp],
        providers: [user_service_1.UserService, roost_service_1.RoostService, http_1.HTTP_PROVIDERS],
        pipes: [ng2_pagination_1.PaginatePipe]
    }), 
    __metadata('design:paramtypes', [router_1.ActivatedRoute, roost_service_1.RoostService, ng2_cache_1.CacheService, router_1.Router, notifications_service_1.NotificationsService])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map
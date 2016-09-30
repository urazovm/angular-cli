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
const roost_service_1 = require('../services/roost.service');
const ng2_cache_1 = require('ng2-cache/ng2-cache');
const comment_1 = require('../shared/comment');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
const ng2_pagination_1 = require('ng2-pagination');
const ng2_modal_1 = require('ng2-modal');
const notifications_service_1 = require('../notifications/notifications.service');
let ProfileFeed = class ProfileFeed {
    constructor(_roostService, _cacheService, _notificationService) {
        this._roostService = _roostService;
        this._cacheService = _cacheService;
        this._notificationService = _notificationService;
        this.header = "Home Page";
        this.isLoading = true;
        this.displayList = false;
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
        if (null != this._cacheService.get('accessTokenRooster')) {
            console.log(this._cacheService.get('accessTokenRooster'));
            this.isUserLoggedIn = true;
        }
    }
    ngOnInit() {
        this.pageSize = 50;
        this.getPage();
    }
    getPage(page) {
        this._roostService.getFeeds(page)
            .subscribe(feeds => {
            console.log(feeds);
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results;
            this.page = null != page ? page : this.page;
        });
    }
    onPageChange(page) {
        console.log(page);
        this.getPage(page);
    }
    playVideo(id) {
        console.log(id);
    }
    redirectToGMaps(latitude, longitude) {
        window.open('http://maps.google.com/maps?q=' + latitude + ',' + longitude);
    }
    extractDate(date) {
        this.diff = (new Date().getTime() - new Date(date).getTime()) / 1000;
        if (this.diff <= 60)
            return "Just Now";
        else if (this.diff < 3600)
            return Math.round(this.diff / 60) + " minutes ago";
        else if (this.diff < 7200)
            return "1 hour ago";
        else if (this.diff < 86400)
            return Math.round(this.diff / 3600) + " hours ago";
        else if (this.diff <= 172800)
            return "1 day ago";
        else if (this.diff > 172800)
            return Math.round(this.diff / 86400) + " days ago";
    }
    toggleShout(feed) {
        if (this.isUserLoggedIn == true) {
            this._roostService.shout(feed.id)
                .subscribe(roosts => {
                feed.isShout = true;
                feed.shouts = feed.shouts + 1;
                if (feed.isListened == true) {
                    feed.isListened = false;
                    feed.listeners = feed.listeners - 1;
                }
            });
        }
        else {
            if (this._notificationService != null)
                this._notificationService.error(this.title, '');
        }
    }
    toggleListen(feed) {
        if (this.isUserLoggedIn == true) {
            this._roostService.listen(feed.id)
                .subscribe(roosts => {
                feed.isListened = true;
                feed.listeners = feed.listeners + 1;
                if (feed.isShout == true) {
                    feed.isShout = false;
                    feed.shouts = feed.shouts - 1;
                }
            });
        }
        else {
            this._notificationService.error(this.title, '');
        }
    }
    displayShoutsList(feed) {
        if (this.isUserLoggedIn == true) {
            this._roostService.listShouts(feed.id)
                .subscribe(lists => {
                console.log(lists);
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = "Shout";
                this.myModal.open();
            });
        }
        else {
            this._notificationService.error(this.title, '');
        }
    }
    displayShoutsDetailList(feed) {
        if (this.isUserLoggedIn == true) {
            this._roostService.listShouts(feed.id)
                .subscribe(lists => {
                console.log(lists);
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = "Shout";
                this.showDetail(feed);
            });
        }
    }
    displayListenersList(feed) {
        if (this.isUserLoggedIn == true) {
            this._roostService.listListeners(feed.id)
                .subscribe(lists => {
                console.log(JSON.stringify(lists));
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Reach' : 'Listen';
                this.myModal.open();
            });
        }
        else {
            this._notificationService.error(this.title, '');
        }
    }
    displayListenersDetailList(feed) {
        if (this.isUserLoggedIn == true) {
            this._roostService.listListeners(feed.id)
                .subscribe(lists => {
                console.log(JSON.stringify(lists));
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Reach' : 'Listen';
                this.showDetail(feed);
            });
        }
    }
    displayCommentsList(feed) {
        if (this.isUserLoggedIn == true) {
            this._roostService.listComments(feed.id)
                .subscribe(lists => {
                console.log(lists);
                this.processComments(lists.results);
                console.log(this.comments);
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Comments' : 'Discussions';
                ;
                this.commentsModal.open();
                this.currentRoost = feed;
            });
        }
        else {
            console.log(this._notificationService);
            this._notificationService.error(this.title, '');
        }
    }
    displayCommentsDetailList(feed) {
        if (this.isUserLoggedIn == true) {
            this._roostService.listComments(feed.id)
                .subscribe(lists => {
                console.log(lists);
                this.processComments(lists.results);
                console.log(this.comments);
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Comments' : 'Discussions';
                ;
                this.currentRoost = feed;
                this.showDetail(feed);
            });
        }
    }
    addComment(comment) {
        if (this.isUserLoggedIn == true) {
            console.log(comment);
            console.log(this.currentRoost);
            this._roostService.comment(this.currentRoost.id, comment)
                .subscribe(response => {
                console.log(response);
                this.displayCommentsList(this.currentRoost);
                this.currentRoost.comments = this.currentRoost.comments + 1;
            });
        }
    }
    processComments(lists) {
        this.comments = new Array();
        for (let obj of lists) {
            this.comments.push(new comment_1.Comment(obj.commented_by, obj.comment, obj.created_at));
        }
        this.detailComments = this.comments.slice(0, 5);
    }
    showDetail(feed) {
        if (this.isUserLoggedIn == true) {
            this.profileFeed = feed;
            this._roostService.listComments(feed.id)
                .subscribe(lists => {
                console.log(lists);
                this.processComments(lists.results);
                console.log(this.comments);
                this.currentRoost = feed;
                this._roostService.listListeners(feed.id)
                    .subscribe(lists => {
                    console.log(JSON.stringify(lists));
                    this.listens = lists.results;
                });
                this._roostService.listShouts(feed.id)
                    .subscribe(lists => {
                    console.log(lists);
                    this.shouts = lists.results;
                });
                this.detailModal.open();
            });
        }
    }
    addDisplayComment(comment) {
        console.log(comment);
        console.log(this.currentRoost);
        this._roostService.comment(this.currentRoost.id, comment)
            .subscribe(response => {
            console.log(response);
            this.showDetail(this.currentRoost);
            this.currentRoost.comments = this.currentRoost.comments + 1;
        });
    }
    leave(feed) {
        this._roostService.leave(feed.id);
        this.detailModal.close();
    }
    viewComments(feed) {
        this.detailModal.close();
        this.displayCommentsList(feed);
    }
};
__decorate([
    core_1.ViewChild('myModal'), 
    __metadata('design:type', ng2_modal_1.Modal)
], ProfileFeed.prototype, "myModal", void 0);
__decorate([
    core_1.ViewChild('commentsModal'), 
    __metadata('design:type', ng2_modal_1.Modal)
], ProfileFeed.prototype, "commentsModal", void 0);
__decorate([
    core_1.ViewChild('detailModal'), 
    __metadata('design:type', ng2_modal_1.Modal)
], ProfileFeed.prototype, "detailModal", void 0);
ProfileFeed = __decorate([
    core_1.Component({
        selector: '',
        directives: [router_1.RouterLink, common_1.CORE_DIRECTIVES, ng2_pagination_1.PaginationControlsCmp, ng2_modal_1.MODAL_DIRECTIVES],
        providers: [roost_service_1.RoostService, http_1.HTTP_PROVIDERS, ng2_pagination_1.PaginationService, ng2_modal_1.Modal]
    }), 
    __metadata('design:paramtypes', [roost_service_1.RoostService, ng2_cache_1.CacheService, notifications_service_1.NotificationsService])
], ProfileFeed);
exports.ProfileFeed = ProfileFeed;
//# sourceMappingURL=profileFeed.component.js.map
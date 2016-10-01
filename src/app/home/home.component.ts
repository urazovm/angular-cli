import {OnInit, Component, ViewContainerRef, ViewChild} from '@angular/core';
import {PaginationControlsCmp, PaginatePipe} from 'ng2-pagination';
import {CacheService} from 'ng2-cache/ng2-cache';

import {ProfileFeed} from '../feed/feed.component';
import {RoostService} from '../services/roost.service';
import {Roost} from '../shared/roost';
import {NotificationsService} from '../notifications/notifications.service';
import {Modal} from 'ng2-modal'


@Component({
    selector: 'home',
    templateUrl: '../feed/feed.component.html',
    providers: [RoostService]
})
export class HomeComponent extends ProfileFeed implements OnInit{
    header = "Home Page";
    @ViewChild('userActionsModal') 
    userActionsModal: Modal;
    @ViewChild('commentsModal') 
    commentsModal: Modal;
    @ViewChild('detailModal') 
    detailModal: Modal;
    @ViewChild('loginModal')
    loginModal: Modal;

    constructor(private roostService: RoostService,
            private cacheService: CacheService,
            private notifyService: NotificationsService){
        super(roostService, cacheService, notifyService);
    }

    ngOnInit(){
        this.pageSize = 50;
        this.getPage();  
    }

    getPage(page?: number) {
        this.roostService.getFeeds(page)
           .subscribe(feeds => {
               console.log(feeds);
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results as Roost[];
            this.page = null != page? page: this.page;
            });
    }
}
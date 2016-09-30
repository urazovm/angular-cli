import {OnInit, Component, ViewChild} from '@angular/core';
import {RouterLink,Router} from '@angular/router';
import {HttpModule} from '@angular/http';
import {CacheService} from 'ng2-cache/ng2-cache';
import {PaginationControlsCmp, PaginatePipe} from 'ng2-pagination';

import {ProfileFeed} from '../feed/feed.component';
import {RoostService} from '../services/roost.service';
import {PromotionsService} from '../services/promotion.service';
import {NotificationsService} from '../notifications/notifications.service';
import {Roost} from '../shared/roost';
import {Modal} from 'ng2-modal';

@Component({
    selector: 'promotions',
    templateUrl: '../feed/feed.component.html',
    providers: [PromotionsService, HttpModule, RoostService]
})

export class PromotionsComponent extends ProfileFeed implements OnInit{
    header = "Complaints page";
    @ViewChild('userActionsModal') 
    userActionsModal: Modal;
    @ViewChild('commentsModal') 
    commentsModal: Modal;
    @ViewChild('detailModal') 
    detailModal: Modal;
    
    constructor(private _promotionService: PromotionsService, 
                private _router: Router,
                private cacheService: CacheService,
                private roostService: RoostService,
                private notifyService: NotificationsService){
        super(roostService, cacheService, notifyService);
        if(null == this.cacheService.get('accessTokenRooster')){
            this._router.navigate(['home']);
        }
    }
    
    ngOnInit(){
        this.pageSize = 50;
        this.getPage();  
    }

    getPage(page?: number) {
        this._promotionService.getAllPromotions(page)
           .subscribe(feeds => {
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results as Roost[];
            this.page = null != page? page: this.page;
            });
    }


}
import {OnInit, Component} from '@angular/core';
import {HttpModule} from '@angular/http';
import {Router, Routes, ActivatedRoute } from '@angular/router';
import {PaginationControlsCmp, PaginatePipe, Ng2PaginationModule} from 'ng2-pagination';
import {CacheService} from 'ng2-cache/ng2-cache';

import {ProfileFeed} from '../feed/feed.component';
import {RoostService} from '../services/roost.service';
import {UserService} from '../services/user.service';
import {NotificationsService} from '../notifications/notifications.service';
import {Roost} from '../shared/roost';

@Component({
    selector: 'search',
    templateUrl: '../feed/feed.component.html',
    providers: [UserService, RoostService, HttpModule, Ng2PaginationModule]
})
export class SearchComponent extends ProfileFeed implements OnInit{
    searchQry: string;
    errorMessage: string;
    sub: any;

constructor(private route: ActivatedRoute, 
    private roostService: RoostService,
    private cacheService: CacheService,
    private _router: Router,
    private notifyService: NotificationsService){
        super(roostService, cacheService, notifyService);
    this.sub = this.route.params
        .subscribe(params => {
            this.searchQry = params['searchKey'];
            if(null == this.searchQry || this.searchQry == ''){
                this._router.navigate(['home']);
            }
            this.triggerSearch();
    });
}

ngOnInit(){
    this.pageSize = 50;
}

triggerSearch(){
    this.roostService.search(this.searchQry)
        .subscribe(feeds => {
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results as Roost[];
        },
        error => this.errorMessage);
}

}
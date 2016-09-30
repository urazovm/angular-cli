import {OnInit, Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink,Router, RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {RoostService} from '../services/roost.service';
import {CacheService} from 'ng2-cache/ng2-cache';
import {Roost} from '../shared/roost';
import {Comment} from '../shared/comment';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';
import {ModalModule, Modal} from 'ng2-modal';
import {NotificationsService} from '../notifications/notifications.service';
import {SimpleNotificationsComponent} from '../notifications/simple-notifications.component';

@Component({
    selector: 'feed',
    templateUrl: 'feed.component.html',
    providers: [RoostService, HttpModule, RouterModule, PaginationService, Modal]
})
export class ProfileFeed implements OnInit{
    header = "Home Page";
    isLoading = true;
    roosts: Roost[];
    diff: number;
    pageSize: number;
    page: number;
    total: number;
    lists: any;
    displayList: boolean = false;
    displayListTitle: string;
    @ViewChild('userActionsModal')
    userActionsModal: Modal;
    @ViewChild('commentsModal')
    commentsModal: Modal;
    @ViewChild('detailModal')
    detailModal: Modal;
    profileFeed: Roost;
    comments: Array<Comment>;
    detailComments: Array<Comment>;
    shouts: any;
    listens: any;
    currentRoost: Roost;
    commentText: any;
    isUserLoggedIn: boolean;
    title: string = "Please login to continue";
    

    options = {
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

    constructor(private _roostService: RoostService,
        private _cacheService: CacheService,
        private _notificationService: NotificationsService){
            if(null != this._cacheService.get('accessTokenRooster')){
                console.log(this._cacheService.get('accessTokenRooster'));
                this.isUserLoggedIn = true;
            } 
    }
    
   ngOnInit() {
        this.pageSize = 50;
        this.getPage();  
    }

    getPage(page?: number) {
        this._roostService.getFeeds(page)
           .subscribe(feeds => {
               console.log(feeds);
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results as Roost[];
            this.page = null != page? page: this.page;
            });
    }

    onPageChange(page: number) {
        console.log(page);
        this.getPage(page);
    }

    playVideo(id: number){
        console.log(id);
    }

    redirectToGMaps(latitude: number, longitude: number){
        window.open('http://maps.google.com/maps?q=' + latitude+',' + longitude);
    }
    
    extractDate(date: string) {
        this.diff = (new Date().getTime() - new Date(date).getTime())/1000;
        if(this.diff <= 60)
            return "Just Now";
        else if(this.diff < 3600)
            return Math.round(this.diff/60) + " minutes ago";
        else if(this.diff < 7200)
            return "1 hour ago";
        else if(this.diff < 86400)
            return Math.round(this.diff/3600) + " hours ago";
        else if(this.diff <= 172800)
            return "1 day ago";
        else if(this.diff > 172800)
            return Math.round(this.diff/86400) + " days ago";
    }

    toggleShout(feed: Roost){
        if(this.isUserLoggedIn == true){
            this._roostService.shout(feed.id)
                .subscribe(roosts => {
                    feed.isShout = true;
                    feed.shouts = feed.shouts + 1;
                    if(feed.isListened == true){
                        feed.isListened = false;
                        feed.listeners = feed.listeners - 1;
                    }
                });
        }
        else{
            if(this._notificationService != null)
                this._notificationService.error(this.title, '');
        }
    }

    toggleListen(feed: Roost){
        if(this.isUserLoggedIn == true){
            this._roostService.listen(feed.id)
                .subscribe(roosts => {
                    feed.isListened = true;
                    feed.listeners = feed.listeners + 1;
                    if(feed.isShout == true){
                        feed.isShout = false;
                        feed.shouts = feed.shouts - 1;
                    }
                });
        }
        else{
            this._notificationService.error(this.title, '');
        }
    }

    displayShoutsList(feed: Roost){
        if(this.isUserLoggedIn == true){      
            this._roostService.listShouts(feed.id)
                .subscribe(lists => {
                console.log(lists);
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = "Shout";
                this.userActionsModal.open();
                });
        }
        else{
            this._notificationService.error(this.title, '');
        }
    }

    displayShoutsDetailList(feed: Roost){  
        if(this.isUserLoggedIn == true){    
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

    displayListenersList(feed: Roost){
        if(this.isUserLoggedIn == true){
            this._roostService.listListeners(feed.id)
                .subscribe(lists => {
                console.log(JSON.stringify(lists));
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Reach' : 'Listen';
                this.userActionsModal.open();
                });
        }
        else{
            this._notificationService.error(this.title, '');
        }
    }

    displayListenersDetailList(feed: Roost){
        if(this.isUserLoggedIn == true){
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

    displayCommentsList(feed: Roost){
        if(this.isUserLoggedIn == true){
            this._roostService.listComments(feed.id)
                .subscribe(lists => {
                console.log(lists);
                this.processComments(lists.results);
                console.log(this.comments);
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Comments' : 'Discussions';;
                this.commentsModal.open();
                this.currentRoost = feed;
                });
        }
        else{
            console.log(this._notificationService);
            this._notificationService.error(this.title, '');
        }
    }

    displayCommentsDetailList(feed: Roost){
        if(this.isUserLoggedIn == true){
            this._roostService.listComments(feed.id)
                .subscribe(lists => {
                console.log(lists);
                this.processComments(lists.results);
                console.log(this.comments);
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Comments' : 'Discussions';;
                this.currentRoost = feed;
                this.showDetail(feed);
                });
        }
    }

    addComment(comment: string){
        if(this.isUserLoggedIn == true){
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

    processComments(lists: Array<any>){
        this.comments = new Array<Comment>();
        for(let obj of lists){
            this.comments.push(new Comment(obj.commented_by, obj.comment, obj.created_at));
        }
        this.detailComments = this.comments.slice(0, 5);
    }

    showDetail(feed: Roost){
        if(this.isUserLoggedIn == true){
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

    addDisplayComment(comment: string){
        console.log(comment);
            console.log(this.currentRoost);
            this._roostService.comment(this.currentRoost.id, comment)
                .subscribe(response => {
                console.log(response);
                this.showDetail(this.currentRoost);
                this.currentRoost.comments = this.currentRoost.comments + 1;
                });
    }

    leave(feed: Roost){
        this._roostService.leave(feed.id);
        this.detailModal.close();
    }

    viewComments(feed: Roost){
        this.detailModal.close();
        this.displayCommentsList(feed);
    }
    
}
import { Component, Input, HostListener, HostBinding, OnInit, ViewChild } from '@angular/core';
import {Routes, Router, RouterModule} from '@angular/router';
import {NgClass, NgStyle} from '@angular/common';
import {HttpModule} from '@angular/http';

import {UserService} from './services/user.service';
import {SessionService} from './services/session.service';
import {RoostService} from './services/roost.service';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk/dist';
import {CacheService} from 'ng2-cache/ng2-cache';
import {User} from './shared/user';
import {SideNavDisplay} from './shared/sideNav';
import {Widget} from './shared/widget';
import {Roost} from './shared/roost';
import {Tag} from './shared/tag';
import {GoogleplaceDirective} from './directives/googleplace.directive';
import {ModalModule, Modal} from 'ng2-modal';

import {NotificationsService} from './notifications/notifications.service';
import {SimpleNotificationsComponent} from './notifications/simple-notifications.component';

const URL = "http://52.43.46.127:80/api/roost";

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers: [UserService, RoostService, SessionService, HttpModule,
        RouterModule, FacebookService, SideNavDisplay, Widget, Roost, ViewChild, ModalModule],
    styles: ['app.component.css']
})
export class AppComponent implements OnInit{


    searchText: string = '';
    showNotifications: boolean = false;
    needsToggle: boolean = false;
    notificationCount: number;
    notifications: string[];
    isUserLoggedIn: boolean = false;
    response: any;
    user: User;
    complaintTitle: string;
    complaintLocation: string;
    tags: string;
    complaintDesc: string;
    fileToUpload: File;
    loginText: string;
    firstName: string;
    lastName: string;
    userImg: string;
    userId: number;
    fileUploadType: string;
    address : any;
    latitude: any;
    longitude: any;
    title: string = "Please login to continue";
    @ViewChild('loginModal')
    loginModal: Modal;
    

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

   
    constructor(private sideNav: SideNavDisplay,
            private widget: Widget,
            private _router: Router, 
            private roostService: RoostService,
            private _cacheService: CacheService, 
            private fb: FacebookService,
            private _sessionService: SessionService,
            private userService: UserService,
            private roost: Roost,
            private _service: NotificationsService,
            private viewChild: ViewChild){
        let fbParams: FacebookInitParams = {
                        appId: '1730242673902791',
                        xfbml: true,
                        version: 'v2.7'
                    };
        this.fb.init(fbParams);
        if(null != this._cacheService.get('accessTokenRooster')){
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
    
    ngOnInit(){
    }

    logout(){
        this._sessionService.logOutUser()
            .subscribe(response => {
                    console.log(response);
            });
        this._router.navigate(['home']);
        this.sideNav.makeActive('Home');
        this._cacheService.removeAll();
        this.isUserLoggedIn = false;
    }

    imgChangeEvent(fileInput: any){
        this.fileUploadType = 'IMG';
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e : any) {
                $('#previewImg').attr('src', e.target.result);
            }

            reader.readAsDataURL(fileInput.target.files[0]);
            this.fileToUpload = fileInput.target.files[0];
        }
    }

    vidChangeEvent(fileInput: any){
        this.fileUploadType = 'VID';
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e : any) {
                $('#previewVid').attr('src', e.target.result);
            }

            reader.readAsDataURL(fileInput.target.files[0]);
            this.fileToUpload = fileInput.target.files[0];
        }
    }

    audChangeEvent(fileInput: any){
        this.fileUploadType = 'AUD';
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e : any) {
                $('#previewAud').attr('src', e.target.result);
            }

            reader.readAsDataURL(fileInput.target.files[0]);
            this.fileToUpload = fileInput.target.files[0];
        }
    }

    validatePromotions(){
        if(this.isUserLoggedIn == true){
            this._router.navigate(['promotions']);
            this.sideNav.makeActive('Promotions');
        }
        else{
            this._service.error(this.title, '');
        }
    }

    validateComplaints(){
        if(this.isUserLoggedIn == true){
            this._router.navigate(['complaints']);
            this.sideNav.makeActive('Complaints');
        }
        else{
            this._service.error(this.title, '');
        }
    }

    login(login: number)
    {
        console.log("Got here");
    }
    handleLogin(): void {
        this.loginModal.open();
    }

    facebookLogin(){
        this.loginModal.close();
        this.handleFacebookLogin();
    }

    loginMobile(){

    }

    handleFacebookLogin(){
        this.fb.login().then(
        (response: FacebookLoginResponse) => {
            this._cacheService.set('userIdFB', response.authResponse.userID);
            this._cacheService.set('accessTokenFB', response.authResponse.accessToken);
            this.handleAppLogin();
            (error: any) => console.error(error)
        });
    }

    handleAppLogin(): void{
        this._sessionService.loginUser(
            this._cacheService.get('userIdFB'), 
            this._cacheService.get('accessTokenFB'))
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

    getAddress(place:Object) {       
           this.address = place['formatted_address'];
           var location = place['geometry']['location'];
           this.latitude =  location.lat();
           this.longitude = location.lng();
           console.log("Address Object", this.address);
           console.log("Latitude", this.latitude);
           console.log("Longitude", this.longitude);
       }

    triggerSearch(searchTxt: string){
        console.log(searchTxt);
        this.setActiveFlagsFalse();
        this._router.navigate(['search',  searchTxt]);
    }
    
    makeActive(path: string){
        this.sideNav.makeActive(path);
    }

    togglePlus(){
        this.widget.togglePlus();
    }

    
    toggleAddButtons(){
        this.widget.toggleAddButtons();
    }

    showPromotionDiv(){
        this.widget.showPromotionDiv();
    }

    showComplaintDiv(){
        this.widget.showComplaintDiv();
    }

    closeWidget(){
        this.fileUploadType = null;
        this.widget.closeWidget();
    }

    setActiveFlagsFalse(){
        this.sideNav.setActiveFlagsFalse();
    }

    toggleNotifications(){
        this.needsToggle = !this.needsToggle;
        this.userService.getUserNotifications()
            .subscribe(response => {
                console.log(JSON.stringify(response));
            });
    }

    handleOffClick(){
        if(this.needsToggle == true){
            this.showNotifications = !this.showNotifications;
            this.needsToggle = !this.needsToggle;
            return;
        }
        this.showNotifications = false;
    }

    submitRoost(){
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


    getTags(){
        var res: string[] = this.tags.split(" ");
        console.log(res.length);
        var tags = new Array<Tag>();
        for(var i =0; i <res.length; i++){
            var t = new Tag();
            t.id = i;
            t.tag = res[i];
            tags.push(t);
        }
        return tags;
    }
}
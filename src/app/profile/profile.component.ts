import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, Router, RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MdInputModule} from '@angular2-material/input';
import {MdToolbar} from '@angular2-material/toolbar';
import {CacheService} from 'ng2-cache/ng2-cache';
import {NotificationsService} from '../notifications/notifications.service';

import {UserService} from '../services/user.service';
import {User} from '../shared/user';


@Component({
    templateUrl:'profile.html',
    providers: [FormBuilder, User, UserService, HttpModule, CommonModule, FormsModule, MdInputModule, RouterModule]
})
export class ProfileComponent implements OnInit{
    header = "Profile page";
    response: any;
    fileToUpload: File;

    constructor(private _userService: UserService, 
        private _cache: CacheService,
        private _router: Router,
        private userProfile: User,
        private _notificationService: NotificationsService){
            if(null == this._cache.get('accessTokenRooster')){
                this._router.navigate(['home']);
            }
    }


    ngOnInit(){
        this.getUserInfo();
    }

    imgChangeEvent(fileInput: any){
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e : any) {
                $('#profilePic').attr('src', e.target.result);
            }

            reader.readAsDataURL(fileInput.target.files[0]);
            this.userProfile.profile_image = fileInput.target.files[0];
            console.log(fileInput.target.files[0]);
            this.savePofilePic(fileInput.target.files[0]);
        }
    }

    getUserInfo(){
        this._userService.getUserInfo(this._cache.get("userIdRooster"))
            .subscribe(profile => {
                console.log(profile);
                this.userProfile.first_name = profile.name;
                this.userProfile.last_name = profile.surname;
                this.userProfile.email = profile.email;
                this.userProfile.mobile_number = profile.mobile_number;
                this.userProfile.facebook_id = profile.facebook_id;                
                this.userProfile.gender = profile.gender;
                this.userProfile.profile_image = profile.profile_image;
                console.log(profile.profile_image);
                this.userProfile.dob = this.reverseDate(profile.dob);               
            });
    }

    savePofilePic(profile_image: any){
        this._userService.updateProfilePic(profile_image)
            .subscribe(profile => {
                console.log(profile);
            this._notificationService.success('Profile Picture Updated Successfully', '');
            this._cache.set('userImg', profile.profile_image);
            });
    }

    saveProfile(){
        this._userService.updateProfile(this._cache.get("userIdFB"), 
                    this._cache.get("accessTokenFB"), 
                    this.userProfile.first_name, 
                    this.userProfile.last_name, 
                    this.userProfile.gender, 
                    this.userProfile.email, 
                    this.parseDate(this.userProfile.dob),
                    this.userProfile.mobile_number)
            .subscribe(profile => {
                console.log(profile);
            this._notificationService.success('Profile Updated Successfully', '');
        });
    }

     parseDate(date: string){
        if(null != date){
            var res: string[] = date.split("/");
            return res[2] + "-" + res[1] + "-" + res[0]; 
        }
    }

    reverseDate(date: string){
        if(null != date){
            var res: string[] = date.split("-");
            return res[2] + "/" + res[1] + "/" + res[0]; 
        }
    }


}
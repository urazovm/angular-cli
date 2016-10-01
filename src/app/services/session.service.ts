import {Injectable} from '@angular/core';
import {URLSearchParams, Http,  Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {User} from '../shared/user';
import {CacheService} from 'ng2-cache/ng2-cache';

@Injectable()
export class SessionService {
    private _url = "http://52.43.46.127:80/api/session/";
    accessToken: string;
    
    constructor(private _http: Http,
                private _cacheService: CacheService){
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster');
    }
    
    getRequestOptions(params?: URLSearchParams){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        if(null == params){
            return new RequestOptions({ headers: headers });
        }
        return new RequestOptions({ headers: headers, search: params});
    }

    requestPin(mobileNumber: number) {
        return this._http.post(this._url + "request_pin", JSON.stringify({mobile_number: mobileNumber}))
            .map(res => res);
    }

    verifyPin(mobileNumber: number, otp: number) {
         return this._http.post(this._url + "verify_pin", JSON.stringify({mobile_number: mobileNumber, auth_token: otp}))
            .map(res => res);
    }

    registerUser(facebook_id: string, 
            facebook_token: string, 
            first_name: string, 
            last_name: string, 
            gender: number, 
            email: string, 
            dob: string, 
            profile_image?: string, 
            mobile?: string): Observable<any>{
        return this._http.post(this._url + "register", 
                JSON.stringify({facebook_id: facebook_id, 
                    facebook_token: facebook_token, 
                    name: first_name, surname: 
                    last_name, 
                    email: email, 
                    dob: dob, 
                    gender: gender, 
                    mobile_number: mobile}), 
                    this.getRequestOptions())
            .map(res => res.json());
    }

    registerMobileUser(first_name: string, 
            last_name: string, 
            gender: number, 
            email: string, 
            dob: string, 
            mobile: string,
            profile_image?: string): Observable<any>{
        return this._http.post(this._url + "register", 
                JSON.stringify({name: first_name, surname: 
                    last_name, 
                    email: email, 
                    dob: dob, 
                    gender: gender, 
                    mobile_number: mobile}), 
                    this.getRequestOptions())
            .map(res => res.json());
    }

    loginUser(facebook_id: string, 
            facebook_token: string): Observable<any>{
        return this._http.post(this._url + "register", JSON.stringify({facebook_id: facebook_id, 
            facebook_token: facebook_token}), this.getRequestOptions())
            .map((res: Response) => res.json());
    }


    logOutUser(): Observable<any>{
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        console.log(this._cacheService.get('accessTokenRooster'))
        console.log(this.accessToken);
        return this._http.delete(this._url + "logout", {  headers : myHeader })
            .map((res: Response) => res.json());
    }
    
}
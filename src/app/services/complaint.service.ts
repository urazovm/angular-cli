import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Http, Headers, Response} from '@angular/http';

import {CacheService} from 'ng2-cache/ng2-cache';

@Injectable()
export class ComplaintsService {
    url: string = "http://52.43.46.127:80/api/roost/complaints/";
    accessToken: string;
    
     constructor(private _http: Http,
                private _cacheService: CacheService){
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster')
    }

    createAuthorizationHeader(headers:Headers) {
        headers.append('Authorization', this.accessToken); 
        headers.append('Content-Type', 'text/plain'); 
    }
    
    getAllComplaints(page?: number): Observable<any> {
        var url = this.url;
        if(null != page)
            url += "?page=" + page;
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this.url, { headers : myHeader})
            .map((res: Response) => res.json());
    }
    postComplaints() {
        return this._http.post(this.url, null)
            .map(res => res.json());
    }
    
}
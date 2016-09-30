import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http,  Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {CacheService} from 'ng2-cache/ng2-cache';


@Injectable()
export class PromotionsService {
    private _url = "http://52.43.46.127:80/api/roost/promotions/";
    accessToken: string;
    
    constructor(private _http: Http,
                private _cacheService: CacheService){
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster')
    }
    
    createAuthorizationHeader(headers:Headers) {
        headers.append('Authorization', this.accessToken); 
        headers.append('Content-Type', 'text/plain');
    }

    getAllPromotions(page?: number): Observable<any> {
        var url = this._url;
        if(null != page)
            url += "?page=" + page;
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(url, { headers : myHeader})
            .map((res: Response) => res.json());
    }

    postPromotion() {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._url, options)
            .map(res => res.json());
    }
    
}
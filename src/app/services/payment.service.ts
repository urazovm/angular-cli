import {Injectable} from '@angular/core';
import {URLSearchParams, Http,  Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CacheService} from 'ng2-cache/ng2-cache';

import {Roost} from '../shared/roost';
import {User} from '../shared/user';

@Injectable()
export class PaymentService {
    private _url = "http://52.43.46.127:80/api/payment/";
    accessToken: string;
    
    constructor(private _http: Http,
                private _cacheService: CacheService){
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster')
    }
    
    payuCheckSum(txnId: number, amount: number, productInfo: string, firstname: string, email: string): Observable<any>{
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.post(this._url + "payu_checksum", JSON.stringify({txnin: txnId, 
            amount: amount, productInfo: productInfo, firstname: firstname, email: email}), {headers: myHeader})
            .map((res: Response) => res.json());
    }

    getOrderId(amount: number, roost: number): Observable<any>{
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.post(this._url + "orderid", JSON.stringify({amount: amount, roost: roost}), {headers: myHeader})
            .map((res: Response) => res.json());
    }

    getWallet(): Observable<any>{
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "my_wallet", {headers: myHeader})
            .map((res: Response) => res.json());
    }
    
}
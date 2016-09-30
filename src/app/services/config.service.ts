import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Response} from '@angular/http';

@Injectable()
 export class ConfigService {

 constructor(private http: Http) {
 }
 
 getEnv(key: any): Observable<any> {
    return this.http.get('/app/config/env.json')
        .map(res => res.json());
 }

 get(key: any): Observable<any> {
   return this.http.get('/app/config/config.json')
        .map((res:Response) => res.json());   
 }
};
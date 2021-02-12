import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment} from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { updatesRequest, updatesResponse } from '../Interfaces/iUpdates';

@Injectable({
  providedIn: 'root',
})
export class LogService extends ApiService<updatesRequest, updatesResponse> {

  private logSubject: BehaviorSubject<updatesResponse>;
  public log: Observable<updatesResponse>;

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/changelog`);
    this.logSubject = new BehaviorSubject<updatesResponse>(null);
    this.log = this.logSubject.asObservable();
  }   

  notifyLogUpdated(log:updatesResponse){
    this.logSubject.next(log);
  }

  getByUserId(userId:number){
    return this._http.get<updatesResponse[]>(this._base + "/" + userId + "/logs", {"headers" : this.getHttpHeaders()}); 
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { LoginRequest, LoginResponse } from '../Interfaces/login';
import { environment} from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { registerRequest } from '../Interfaces/iregisteration';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends ApiService<LoginRequest, LoginResponse> {

  private accountSubject: BehaviorSubject<LoginResponse>;
  public account: Observable<LoginResponse>;

  private logOutSubject: BehaviorSubject<any>;
  public logOutNotification: Observable<any>;

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/users/authenticate`);
    this.accountSubject = new BehaviorSubject<LoginResponse>(null);
    this.account = this.accountSubject.asObservable();
    this.logOutSubject = new BehaviorSubject<any>(null);
    this.logOutNotification = this.logOutSubject.asObservable();
  }  

  getUserInfo():LoginResponse{
      let user:LoginResponse;
      var data = sessionStorage.getItem("userInfo");
      if(data){
          user = JSON.parse(data);
      }
      return user;
  }

  hasAuthenticated():boolean{
      return sessionStorage.getItem("userInfo")!=null;
  }

  logOut(){
      sessionStorage.clear();
      this.logOutSubject.next(null);
  }

  NotifyAuthenticated(userInfo:LoginResponse){
      this.accountSubject.next(userInfo);
  }

  getSocialLogins():Observable<string[]>{
    return this._http.get<string[]>(`${environment.api.baseUrl}/users/getregisersociallogin`, {"headers" : this.getHttpHeaders()});
  }

  externalLogin(provider:registerRequest):Observable<LoginResponse>{
    return this._http.post<LoginResponse>(`${environment.api.baseUrl}/users/externalLogin`,provider,{"headers" : this.getHttpHeaders()});
  }
}
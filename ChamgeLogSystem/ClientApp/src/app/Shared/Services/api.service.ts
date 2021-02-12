import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iApiService } from '../Interfaces/iApiService';

export abstract class ApiService<Trequeest, Tresponse> implements iApiService<Trequeest, Tresponse> {

  constructor(
    protected _http: HttpClient,
    protected _base: string
  ) {}

  post(t: Trequeest): Observable<Tresponse> {
    return this._http.post<Tresponse>(this._base, t, {"headers" : this.getHttpHeaders()});
  }

  put(t: Trequeest): Observable<Tresponse> {
    return this._http.put<Tresponse>(this._base, t,{"headers" : this.getHttpHeaders()});
  }

  findOne(id: any): Observable<Tresponse> {
    return this._http.get<Tresponse>(this._base + "/" + id, {"headers" : this.getHttpHeaders()});
  }

  findAll(): Observable<Tresponse[]> {
    return this._http.get<Tresponse[]>(this._base, {"headers" : this.getHttpHeaders()})
  }

  delete(id: any): Observable<any> {
    return this._http.delete<any>(this._base + '/' + id, {"headers" : this.getHttpHeaders()});
  }

  getHttpHeaders():HttpHeaders{
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    //headers=headers.append('content-type','application/x-www-form-urlencoded')
    if(sessionStorage.getItem("token")){
    headers=headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    }
      return headers;
  }
  

}
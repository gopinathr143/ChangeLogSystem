import { Observable } from 'rxjs';

export interface iApiService<Trequeest, Tresponse> {
  post(t: Trequeest): Observable<Tresponse>;
  put(t: Trequeest): Observable<Tresponse>;
  findOne(id: any): Observable<Tresponse>;
  findAll(): Observable<Tresponse[]>;
  delete(id: any): Observable<void>;
}
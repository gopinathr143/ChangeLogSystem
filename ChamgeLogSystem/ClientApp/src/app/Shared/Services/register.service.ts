import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment} from '../../../environments/environment';
import { registerRequest, registerResponse } from '../Interfaces/iregisteration';

@Injectable({
  providedIn: 'root',
})
export class RegisterService extends ApiService<registerRequest, registerResponse> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/users/register`);
  }   

  
}
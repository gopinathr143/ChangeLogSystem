import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import { LoginService } from '../Services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private loginService:LoginService) {}
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
      return next.handle(request).pipe( tap((res) => {console.log(res)},
        (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401 && err.status!==0) {
           return;
          }
          this.loginService.logOut();
          if(err.status!=0){          
          this.router.navigate(['/signin']);
          }
          else{
            this.router.navigate(['/unreachable']);
          }
        }
      }));
    }
  }
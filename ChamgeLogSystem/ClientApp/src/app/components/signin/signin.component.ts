import { getTreeMissingMatchingNodeDefError } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/Shared/Interfaces/login';
import { LoginService} from '../../Shared/Services/login.service';

import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { registerRequest } from 'src/app/Shared/Interfaces/iregisteration';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm:FormGroup;
  isAuthenticated:boolean;

  socialLogins:string[] = [];

  fbLoginOptions = {
    scope: 'email',
    return_scopes: true,
    enable_profile_selector: true
  };

  constructor(private router: Router, private LoginService: LoginService, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({      
       userName : new FormControl('',Validators.required),
       password : new FormControl('',Validators.required)      
    });   
    this.isAuthenticated = false;
    var parent = this;
    this.LoginService.getSocialLogins().subscribe({
      next(data){
        parent.socialLogins = data;
      },
      error(msg){
        console.log(msg);
      }
    });
  }

  login(): void {
    if(this.loginForm.invalid){
      return;
    }
    let LoginRequest :LoginRequest;
    var parent = this;
    LoginRequest = {
                    password: this.loginForm.controls["password"].value,
                    userName: this.loginForm.controls["userName"].value
                  };
    this.LoginService.post(LoginRequest).subscribe({
      next(data){
        if(data){
        parent.isAuthenticated = true;
        sessionStorage.setItem("token",data.jwtToken);
        sessionStorage.setItem("userInfo",JSON.stringify(data));
        parent.LoginService.NotifyAuthenticated(data);
        parent.router.navigate(['/home']);
        }
      },
      error(error){
        console.error(error);
      }
    });
  } 

  signInWithFB(provider:string): void {
    var parent = this;
    if(provider.toLowerCase()=="fb")
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID, this.fbLoginOptions);
    else if(provider.toLowerCase()=="google")
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, this.fbLoginOptions);
    this.authService.authState.subscribe((socialUser) => {
      if(socialUser){
     let user:registerRequest = {email:socialUser.email, firstName:socialUser.firstName, lastName:socialUser.lastName, userName:socialUser.email, password:"",userId:0};
      parent.LoginService.externalLogin(user).subscribe({
        next(data){
          if(data){
          parent.isAuthenticated = true;
          sessionStorage.setItem("token",data.jwtToken);
          sessionStorage.setItem("userInfo",JSON.stringify(data));
          parent.LoginService.NotifyAuthenticated(data);
          parent.router.navigate(['/home']);
          }
        },
        error(error){
          console.error(error);
        }
      });
    }
    });
  }

}

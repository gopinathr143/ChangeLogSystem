import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NgbModalModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateComponent } from './components/add-update/add-update.component';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import {AuthInterceptor } from './Shared/common/auth.Interceptor';
import { LoginService } from './Shared/Services/login.service';
import { LogService } from './Shared/Services/log.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaintainanceComponent } from './components/maintainance/maintainance.component';
import { FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    HomeComponent,
    AddUpdateComponent,
    MaintainanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModalModule,
    NgbAlertModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserModule,
    SocialLoginModule,
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useFactory: function(router: Router, loginService:LoginService) {
      return new AuthInterceptor(router, loginService);
    },
    multi: true,
    deps: [Router, LoginService]
 },
 {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [      
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider:new GoogleLoginProvider(environment.googleSocialLogin)
      },
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(environment.facebookSocialLogin)
      }
    ]
  } as SocialAuthServiceConfig,
}
],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
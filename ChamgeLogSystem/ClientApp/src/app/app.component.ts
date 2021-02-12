import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from 'angularx-social-login';
import { LoginService } from '../app/Shared/Services/login.service'
import { AddUpdateComponent } from './components/add-update/add-update.component';
import { updatesResponse } from './Shared/Interfaces/iUpdates';
import { LoginResponse } from './Shared/Interfaces/login';
import { LogService } from './Shared/Services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Change Log System';
  isAuthenticated:boolean;
  userInfo:LoginResponse;

  

  constructor(private router: Router, private LoginService: LoginService, private _modalService: NgbModal, private authService: SocialAuthService) { }

  ngOnInit(): void {
    var parent = this;
    this.LoginService.account.subscribe(
      {
        next(data){
          parent.userInfo = data;
          parent.isAuthenticated = true;
        }
      }
    );  

    this.LoginService.logOutNotification.subscribe(
      {
        next(data){
          parent.userInfo = data;
          parent.isAuthenticated = false;
        }
      }
    );   

    this.isAuthenticated = this.LoginService.hasAuthenticated();
    if(this.isAuthenticated){
      this.userInfo = this.LoginService.getUserInfo();  
    }
  }

  open(name: string) {
    this._modalService.open(AddUpdateComponent, { size: 'xl' });
  }

  logOut(){
    this.LoginService.logOut();
    this.router.navigate(['/signin']);
    this.authService.signOut();
  }

  
  

}

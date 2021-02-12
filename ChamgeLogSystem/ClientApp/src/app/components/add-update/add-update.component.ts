import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { updatesRequest } from 'src/app/Shared/Interfaces/iUpdates';
import { LoginResponse } from 'src/app/Shared/Interfaces/login';
import { LoginService } from 'src/app/Shared/Services/login.service';
import {LogService} from '../../Shared/Services/log.service';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.css']
})
export class AddUpdateComponent implements OnInit {
  updateForm:FormGroup;
  constructor(public modal: NgbActiveModal, private logService: LogService, private loginService: LoginService) { }
  userInfo:LoginResponse;

  @ViewChild('Alert', {static: false}) Alert: NgbAlert;
  private _alert = new Subject<any>();
  alertMessage:string;
  alertType:string;

  closeAlert:boolean = false;

  ngOnInit(): void {
    this.updateForm = new FormGroup({      
      title : new FormControl('',Validators.required),
      type : new FormControl('',Validators.required),
      content : new FormControl('', Validators.required)      
   });   

   this.userInfo = this.loginService.getUserInfo();
   this._alert.subscribe((alert:any) => {
     this.alertMessage = alert.message;
     this.alertType = alert.type;
     this.closeAlert = true;
   });

   this._alert.pipe(debounceTime(3000)).subscribe(() => {
    if (this.Alert) {
      this.closeAlert = false;
      this.Alert.close();
      this.modal.close('Ok click');
    }
  });
  }

  save():void{
    if(this.updateForm.valid){
    let updatesRequest : updatesRequest = {
      logId:0,
      createdByUserId: this.userInfo.userId,
      title : this.updateForm.controls["title"].value,
      type : parseInt(this.updateForm.controls["type"].value),
      content : this.updateForm.controls["content"].value
    };
    var parent = this;
    this.logService.post(updatesRequest).subscribe({
      next(data){
          parent._alert.next({message:"Saved successfully", type: "success"});
          parent.logService.notifyLogUpdated(data);
      },
      error(data){
        parent._alert.next({message:"Failed to save", type: "danger"});
    }
    });    
  }
}

}

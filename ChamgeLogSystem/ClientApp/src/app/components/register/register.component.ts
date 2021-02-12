import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch} from '../../Shared/validators/mustmatch.validator';
import {registerRequest} from '../../Shared/Interfaces/iregisteration';
import { RegisterService} from '../../Shared/Services/register.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  registerServerError:string;

  @ViewChild('Alert', {static: false}) Alert: NgbAlert;
  private _alert = new Subject<any>();
  alertMessage:string;
  alertType:string;
  closeAlert:boolean = false;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
    this.registerServerError = "";
          this.registerForm = this.formBuilder.group({      
            firstName : new FormControl('',Validators.required),
            lastName : new FormControl('',Validators.required),
            password : new FormControl('',Validators.required) ,
            userName : new FormControl('',Validators.required),
            email : new FormControl('',[Validators.required, Validators.email]),
            confirmPassword: new FormControl('',Validators.required)    
        },{
          validator: MustMatch('password', 'confirmPassword')
      });

      this._alert.subscribe((alert:any) => {
        this.alertMessage = alert.message;
        this.alertType = alert.type;
        this.closeAlert = true;
      });

      this._alert.pipe(debounceTime(3000)).subscribe(() => {
      if (this.Alert) {
        this.closeAlert = false;
        this.Alert.close();
        this.router.navigate(['/signin']);
      }
      });
  }

  get regForm() { return this.registerForm.controls; }

  onRegister(){
    var parent = this;
    this.registerServerError = "";
    if(this.registerForm.valid){    
    let userInfo:registerRequest = { 
        userId:0,
        email : this.registerForm.controls["email"].value, 
        password: this.registerForm.controls["password"].value, 
        firstName: this.registerForm.controls["firstName"].value,
        lastName:this.registerForm.controls["lastName"].value,
        userName:this.registerForm.controls["userName"].value
    };
    this.registerService.post(userInfo).subscribe({
        next(data){
          parent._alert.next({message:"Saved successfully", type: "success"});
        },
        error(msg){
            parent.registerServerError = msg.error;
        }
        });
    }
}

}
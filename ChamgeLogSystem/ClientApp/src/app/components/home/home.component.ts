import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { updatesResponse } from 'src/app/Shared/Interfaces/iUpdates';
import { LoginResponse } from 'src/app/Shared/Interfaces/login';
import { LogService } from 'src/app/Shared/Services/log.service';
import { LoginService } from 'src/app/Shared/Services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  changeLogList: updatesResponse[] = [];
  displayedColumns = ['title', 'typeDisplay', 'content', 'delete'];
  dataSource = new MatTableDataSource(this.changeLogList);;
  userInfo:LoginResponse;

  constructor(private logService :LogService, private loginService : LoginService) { 
    this.getChangeLog();
  }

  ngOnInit(): void {
    var parent = this;
    this.userInfo = this.loginService.getUserInfo();
   this.logService.log.subscribe({
     next(data){
       parent.getChangeLog();
     }
   });
  }

  getChangeLog(){
    var parent = this;
    if(this.userInfo && this.userInfo.userId > 0){
    this.logService.getByUserId(this.userInfo.userId).subscribe({
      next(data){
        parent.changeLogList = data.map((obj) => {
         switch(obj.type){
            case 1:
            obj.typeDisplay = "New Release";
            obj.color = "blue";
            break;
            case 2:
            obj.typeDisplay = "Update";
            obj.color = "green";
            break;
            case 3:
            obj.typeDisplay = "Fix";
            obj.color = "red";
            break;
         }
          return obj;
      });
        parent.dataSource= new MatTableDataSource(parent.changeLogList);
      },
      error(msg){
        this.changeLogList = [];
        console.log(msg);
      }
    });
  }
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: string)  {
    var parent = this;
    this.logService.delete(id).subscribe({
      next(data){
          parent.getChangeLog();
      }
    });
  }

}

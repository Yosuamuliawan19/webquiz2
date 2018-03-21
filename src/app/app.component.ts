import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Rx';

import {ConfigService} from './Services/config.service';
import {Food} from './food';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
     title = 'app';

     constructor(private _configservice: ConfigService) { }

     result : any = {};
     currentEmail;
     currentPassword;
     status = "Not logged in";
     login (){
      this._configservice.login(this.currentEmail, this.currentPassword);

     }
     registerName;
     registerEmail;
     registerPassword;
     register (){
          this._configservice.register(this.registerName, this.registerEmail, this.registerPassword).subscribe(
               data => {this.result = data},
               err => {console.error(err); alert("Register Unsuccessful");},
               () => {console.log('Register Succesful'); alert("Register Successful");}
          );
     }
     temp: any = {};
     newDataForDisplay :any = {};
     tableItem: any = {};
     item (){
          this._configservice.item().subscribe(
               data => {this.temp = data;
                     this.newDataForDisplay = this.temp.data;
                    console.log("hi" + JSON.stringify(this.newDataForDisplay ));
                    this.tableItem = "<tr><th>id</th>" +
                                   "<th>category_id</th>"+
                                   "<th>name</th> "+
                                   "<th>stock</th>"+
                                   "<th>price</th></tr>"
                    for (let elem of this.newDataForDisplay){
                         this.tableItem = this.tableItem
                         + "<tr> <td>" + elem.id +"</td>"
                         + "<td>" + elem.category_id +"</td>"
                         + "<td>" + elem.name +"</td>"
                         + "<td>" + elem.stock +"</td>"
                         + "<td>" + elem.price +"</td> </tr> "

                         ;
                         console.log(elem.name);
                    }
               },
               err => {console.error(err); alert("Access denied, login first");},
               () => {console.log('item  Succesful'); alert("item fetch Successful");}

          );
     }
     tableCat: any = {};
     category(){
          this._configservice.category().subscribe(
               data => {this.temp = data;
                     this.newDataForDisplay = this.temp.data;
                    console.log("hi" + JSON.stringify(this.newDataForDisplay ));
                    this.tableCat = "<tr><th>id</th>" +
                                   "<th>name</th></tr>"
                    for (let elem of this.newDataForDisplay){
                         this.tableCat = this.tableCat
                         + "<tr> <td>" + elem.id +"</td>"

                         + "<td>" + elem.name +"</td> </tr>"


                         ;
                         console.log(elem.name);
                    }
               },
               err => {console.error(err); alert("Access denied, login first");},
               () => {console.log('category  Succesful'); alert("category fetch Successful");}

          );
     }
}

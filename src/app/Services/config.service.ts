import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Food } from '../food';
import { RestApiService } from './rest-api.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                              'Authorization': 'my-auth-token'})
};

@Injectable()

export class ConfigService {


     constructor(private http: HttpClient, private _restApiService:RestApiService){}

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
    data:any = {};
    login(email , password){
          let currentBody = {
               email:1,
               password:'default'
          }
          currentBody.email = email;
          currentBody.password = password;
          let body = JSON.stringify(currentBody);
          this._restApiService.post('https://contoh.gamelabnetwork.com/api/login', body, this.httpOptions).subscribe(
               data => {
                    this.data = data;
                    console.log(this.data.data.token);
                    localStorage.setItem('token',this.data.data.token);
                    console.log(localStorage.getItem('token'));
               },
                err => {

                     console.error(err);
                     alert("log in error");

               }
                     ,
               () => {
                    alert("log in succesful, press the item or category button to show respective pages");

                    console.log('Post succesful');

               }

          );

        // return  this.http.post('https://contoh.gamelabnetwork.com/api/login', body, this.httpOptions);
     }
    register(name, email , password){
         let currentBody = {
              name:'',
              email:1,
              password:'default'
         }
         currentBody.name = name;
         currentBody.email = email;
         currentBody.password = password;
         let body = JSON.stringify(currentBody);

        return this._restApiService.post('https://contoh.gamelabnetwork.com/api/register', body, this.httpOptions);

    }
    item (){
         console.log(localStorage.getItem('token'));

       let  httpOptionsCustom = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer' + localStorage.getItem('token')
      })
     };

         return this.http.get('https://contoh.gamelabnetwork.com/api/item', httpOptionsCustom);
    }
    category (){
         console.log(localStorage.getItem('token'));

       let  httpOptionsCustom = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer' + localStorage.getItem('token')
      })
     };

         return this.http.get('https://contoh.gamelabnetwork.com/api/category', httpOptionsCustom);
    }
}

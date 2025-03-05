import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = "http://localhost:5050/users/";

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get(this.url+"data");
  }

  addUser(user: any){
    //console.log(user);
    return this.http.post(this.url+"register", user);
  }
  
  getUser(user: any){
    return this.http.post(this.url+"login", user);
  }
}

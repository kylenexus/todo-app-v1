import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl = "http://localhost:63683/api/";

  constructor(private http:HttpClient) { }

  CreateUser(user){
    return this.http.post(this.baseUrl + "users/",user);
  }

}

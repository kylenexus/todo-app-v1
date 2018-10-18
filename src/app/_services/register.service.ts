import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiBaseUrlService } from '../_services/api-base-url.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  constructor(private http:HttpClient, private apiBaseUrl:ApiBaseUrlService) { }

  CreateUser(user){
    return this.http.post(this.apiBaseUrl.GetBaseUrl() + "users",user);
  }

}

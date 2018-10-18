import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiBaseUrlService } from './api-base-url.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.IsAuthenticated());

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  constructor(private http:HttpClient,private apiBaseUrl:ApiBaseUrlService) { }

  UserLogin(login){
    return this.http.post(this.apiBaseUrl.GetBaseUrl() + "login", login);
  }

  UserLogout(){
    localStorage.clear();
  }

  IsAuthenticated():boolean{
    const token=localStorage.getItem("token");

    if ( token!=null || token!=undefined )
      return true;
    else
      return false;
  }

  GetToken():string{
    if (this.IsAuthenticated())
      return localStorage.getItem("token");
    else
      return null;
  }

  SetToken(token){
    localStorage.setItem("token", token);
  }

}

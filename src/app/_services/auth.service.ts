import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  UserLogin(username,password){
    console.log("login:" + username);
  }

  UserLogout(){
    localStorage.clear();
    console.log("logout");
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

}

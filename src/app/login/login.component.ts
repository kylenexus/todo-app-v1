import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../_models/Login';
import { AuthService } from '../_services/auth.service';
import { LoggedUser } from '../_models/LoggedUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  errMessage = "";

  logForm: Login = new Login();

  SubmitLogin(postedData){

    if ( this.isNullEmptyOrWhiteSpace(this.logForm.username) || this.isNullEmptyOrWhiteSpace(this.logForm.password) )
    {
      this.errMessage = "invalid username or password";
      this.ClearForm();
      return;
    }

    this.authService.UserLogin(postedData).subscribe(
      //success
      (data: LoggedUser)=>{
        console.log(data.token);
        this.authService.SetToken(data.token);
        this.ClearForm();
        this.router.navigate(['task']);
      },
      //error
      (error)=>{
        console.log("error: " + error.status + " - " + error.statusText);
        this.errMessage = error.statusText;
        this.ClearForm();
      }
    );
  }

  ClearForm(){
    this.logForm.username = "";
    this.logForm.password = "";
  }

  isNullEmptyOrWhiteSpace(str): boolean{
    if (str==null || str==undefined || str=="")
      return true;
    else
      return false;
  }

}

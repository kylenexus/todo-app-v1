import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../_services/register.service';
import { Router } from '@angular/router';
import { User } from '../_models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService:RegisterService,
              private router:Router) { }

  ngOnInit() {
  }

  regForm: User = new User();

  SubmitRegistration(postedUser){
    console.log(postedUser);

    this.registerService.CreateUser(postedUser).subscribe(
      //success
      (data)=>{
        console.log("registration successful");
        this.router.navigate(['login']);
        this.ClearForm();
      },
      //error
      (error)=>{
        console.log("error:" + error.status + " - " + error.statusText);
        this.ClearForm();
      }
    );

    // this.ClearForm();
    // this.router.navigate(['login']);
  }

  ClearForm(){
    this.regForm.firstname = "";
    this.regForm.lastname = "";
    this.regForm.username = "";
    this.regForm.password = "";
  }

}

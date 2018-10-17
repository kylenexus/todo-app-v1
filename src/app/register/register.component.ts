import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../_services/register.service';
import { Router } from '@angular/router';
import { IUser } from '../_models/IUser';

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

  regForm: IUser = new IUser();

  SubmitRegistration(passedData){
    console.log(passedData);

    // this.registerService.CreateUser(passedData).subscribe(
    //   (success)=>{
    //     console.log("registration successfull");
    //     this.router.navigate(['login']);
    //   },
    //   (error)=>{
    //     console.log(error.value);
    //   }
    // );

    this.ClearForm();
    this.router.navigate(['login']);
  }

  ClearForm(){
    this.regForm.firstname = "";
    this.regForm.lastname = "";
    this.regForm.username = "";
    this.regForm.password = "";
  }

}

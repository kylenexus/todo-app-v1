import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = "http://localhost:63683/api/";

  constructor(private http:HttpClient,private auth:AuthService) { }

  ReadTodo(token){
    return this.http.get(this.baseUrl + "tasks/" + this.auth.GetToken());
  }

  CreateToDo(todo){
    //return this.http.get(this.baseUrl + "tasks/",todo);
    console.log("todo create service");
  }

  UpdateToDo(){
    //return this.http.get(this.baseUrl + "tasks/" );
    console.log("todo update service");
  }

  DeleteToDo(){
    console.log("todo delete service");
  }
}

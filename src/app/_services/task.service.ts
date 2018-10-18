import { Injectable } from '@angular/core';
import { ApiBaseUrlService } from './api-base-url.service';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiBaseUrl:ApiBaseUrlService,
              private authService:AuthService,
              private http:Http) { }

  GetTasks(){
    return this.http.get(this.apiBaseUrl.GetBaseUrl() + "tasks?token=" + this.authService.GetToken());
  }

  AddTask(task){
    return this.http.post(this.apiBaseUrl.GetBaseUrl() + "tasks?token=" + this.authService.GetToken(), task);
  }

  UpdateTask(task){
    return this.http.put(this.apiBaseUrl.GetBaseUrl() + "tasks?token=" + this.authService.GetToken() + "&taskid=" + task.taskid , task);
  }

  DeleteTask(task){
    return this.http.delete(this.apiBaseUrl.GetBaseUrl() + "tasks?token=" + this.authService.GetToken() + "&taskid=" + task.taskid);
  }
}

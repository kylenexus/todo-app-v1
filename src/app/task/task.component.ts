import { Component, OnInit } from '@angular/core';
import { TaskService } from '../_services/task.service';
import { Task } from '../_models/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private taskService:TaskService) { }

  ngOnInit() {
    this.GetTasks();
  }

  tasks: Task[] = [];

  GetTasks(){
    this.taskService.GetTasks().subscribe(
      (data)=>{
        this.tasks = JSON.parse(data['_body']);
      },
      (error)=>{
        console.log("error: " + error.status + " - " + error.statusText);
      }
    );
  }

  taskForm: Task = new Task();

  SubmitNewTask(task){
    this.taskService.AddTask(task).subscribe(
      (data)=>{
        console.log("add success: " + data);
        this.GetTasks();
        this.ClearForm();
      },
      (error)=>{
        console.log("error: " + error.status + " - " + error.statusText);
      }
    );
  }

  DeleteTask(task){
    this.taskService.DeleteTask(task).subscribe(
      (data)=>{
        console.log("delete success: " + data);
        this.GetTasks();
      },
      (error)=>{
        console.log("error: " + error.status + " - " + error.statusText);
      }
    );
  }

  UpdateTask(task){
    console.log("check change: " + JSON.stringify(task));
    task.done = !task.done;

    this.taskService.UpdateTask(task).subscribe(
      (data)=>{
        console.log("update success: " + data);
        this.GetTasks();
      },
      (error)=>{
        console.log("error: " + error.status + " - " + error.statusText);
      }
    );
  }

  isDone(task){
     if (task.done)
      return "done-label";
  }

  ClearForm(){
    this.taskForm.task1 = "";
  }
}

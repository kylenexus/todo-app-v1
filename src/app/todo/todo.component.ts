import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  title = "Things To Do";
  todos = [
    {
      done: true,
      label: "Wake Up"
    },
    {
      done: false,
      label: "Eat Breakfast"
    }
  ];

  addTodo(newTodoLabel){
    var newTodo = {
      done: false,
      label: newTodoLabel
    }

    this.todos.push(newTodo);
  }

  deleteTodo(todo){
    this.todos = this.todos.filter(t=>t.label !== todo.label);

  }

  isDone(todo){
    if (todo.done){
      return "done-label";
    }
  }

  onCheck(todo){
    todo.done = !todo.done;
  }


  constructor() {

  }

  ngOnInit() {
  }

}

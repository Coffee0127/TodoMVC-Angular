import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inputHint: string = 'What needs to be done?';

  myColspan: number = 2;

  todos: any[] = [];

  addTodo(todo: HTMLInputElement) {
    this.todos.push(todo.value);
    todo.value = '';
  }
}

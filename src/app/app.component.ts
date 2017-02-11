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

  todo: string;

  addTodo(item: HTMLInputElement) {
    this.todos.push({
      value: item.value,
      done: false
    });
    item.value = '';
  }
}

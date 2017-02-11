import { Component } from '@angular/core';
import { Http } from '@angular/http';

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

  constructor(private http: Http) {
  }

  addTodo(item: HTMLInputElement) {
    if (item.value) {
      this.todos = [...this.todos, { value: item.value, done: false }];
      item.value = '';
    }
  }

  clearCompleted() {
    this.todos = this.todos.filter(v => !v.done);
  }

  toggleAll(status: boolean) {
    this.todos = this.todos.map(item => {
      item.done = status;
      return item;
    });
  }

  remove(item) {
    // Angular2 使用 splice 會有問題 ==> 所指向的陣列位置沒有改變，因此不會執行變更偵測
    let index = this.todos.indexOf(item);
    this.todos.splice(index, 1);
    // 因此要給予一個全新的陣列
    this.todos = [...this.todos];
  }
}

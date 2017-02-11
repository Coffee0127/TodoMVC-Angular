import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  inputHint: string = 'What needs to be done?';

  myColspan: number = 2;

  todos: any[] = [];

  todo: string;

  constructor(private http: Http) {
  }

  ngOnInit() {
    let body = this.todos;
    let headers = new Headers({
      Authorization: 'token 46c6fab0-2015-4988-ab4c-b8072ab22fd7'
    });
    let options = new RequestOptions({ headers: headers });
    this.http.get('/me/todos-angular', options)
      .subscribe(res => {
        this.todos = res.json();
      });
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

  save() {
    let body = this.todos;
    let headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: 'token 46c6fab0-2015-4988-ab4c-b8072ab22fd7'
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post('/me/todos-angular', body, options)
      .subscribe();
  }
}

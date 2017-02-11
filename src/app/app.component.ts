import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

import { Observable, Subscription } from 'rxjs/Rx';

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

  constructor(public dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.load().subscribe(values => {
      this.todos = values;
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

  private labelMap: Map<HTMLLabelElement, Subscription> = new Map();

  edit(item, label: HTMLLabelElement) {
    if (!JSON.parse(label.getAttribute('data-editing'))) {
      label.setAttribute('data-editing', 'true');
      label.contentEditable = 'true'
      label.focus();
      var textNode = label.firstChild;
      var caret = textNode.textContent.length;
      var range = document.createRange();
      range.setStart(textNode, caret);
      range.setEnd(textNode, caret);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      let input$ = Observable.fromEvent(label, 'input').debounceTime(1000);
      let sub$ = input$.subscribe(v => {
        item.value = label.innerHTML.toUpperCase();
        // TODO update one item only
        this.dataService.save(this.todos);
      });
      this.labelMap.set(label, sub$);
    }
  }

  remove(item) {
    // Angular2 使用 splice 會有問題 ==> 所指向的陣列位置沒有改變，因此不會執行變更偵測
    let index = this.todos.indexOf(item);
    this.todos.splice(index, 1);
    // 因此要給予一個全新的陣列
    this.todos = [...this.todos];
  }

  updateTodo(item, label: HTMLLabelElement) {
    item.value = label.innerHTML;
    label.setAttribute('data-editing', 'false');
    label.contentEditable = 'false';
    this.labelMap.get(label).unsubscribe();
  }
}

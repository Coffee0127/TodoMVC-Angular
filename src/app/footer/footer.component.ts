import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input('footerTodos')
  todos: any[];

  @Output()
  clearCompleted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get activeCount() {
    return this.todos.filter(v => !v.done).length;
  }

  btnClear() {
    this.clearCompleted.emit();
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  filter_type: string = 'All';

  toomuch = false;

  private _todos: any[];

  get todos(): any[] {
    return this._todos;
  }

  @Input('footerTodos')
  set todos(value: any[]) {
    this._todos = value;
    this.toomuch = value.length > 5;
  }

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

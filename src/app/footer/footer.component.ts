import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input('footerTodos')
  todos: any[];

  constructor() { }

  ngOnInit() {
  }

  get activeCount() {
    return this.todos.filter(v => !v.done).length;
  }
}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  load() {
    let headers = new Headers({
      Authorization: 'token 46c6fab0-2015-4988-ab4c-b8072ab22fd7'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('/me/todos-angular', options)
      .map(res => res.json());
  }

  save(todos) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: 'token 46c6fab0-2015-4988-ab4c-b8072ab22fd7'
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post('/me/todos-angular', todos, options).subscribe();
  }
}

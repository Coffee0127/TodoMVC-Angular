import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  static headers = new Headers({
    Authorization: 'token 089c59e8-2f70-457c-938e-be7bb8534ce1'
  });
  static options = new RequestOptions({ headers: DataService.headers });

  constructor(private http: Http) { }

  load() {
    return this.http.get('/me/todos-angular', DataService.options)
      .map(res => res.json());
  }

  save(todos) {
    this.http.post('/me/todos-angular', todos, DataService.options).subscribe();
  }
}

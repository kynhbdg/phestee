import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { take, map } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  httpOptions: any;
  token: any;

  constructor(
  ) {
   }


  getHeaders(token: string) {
      return this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

  }
}

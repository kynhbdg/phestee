import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

import { urlService } from '../config/config';

import { HandleErrorService } from './handle-error.service';
import { GeneralService } from './general.service';

import { Bus } from '../models/bus.model';



@Injectable({
  providedIn: 'root'
})
export class BusService {

  bus: Bus;

  constructor(
    public http: HttpClient,
    public _handleError: HandleErrorService,
    public generalService: GeneralService,
  ) { }


  getBusById(busId: string, token: string) {
    const url = urlService + '/api/bus/';
    const headers = this.generalService.getHeaders(token);
    return this.http.get<Bus>(url + busId, headers).pipe(
      map( res => {
      return res;
    }),
    catchError(this._handleError.handleError));
  }

}

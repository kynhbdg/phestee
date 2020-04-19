import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { urlService } from '../config/config';

import { Post } from '../models/post.model';

import { GeneralService } from './general.service';
import { HandleErrorService } from './handle-error.service';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    public generalService: GeneralService,
    public _handleError: HandleErrorService,
    public http: HttpClient
  ) { }


  createPost( postType: string, body: any, userId: string, token: string, picArray?: Array<File>): Observable<any> {


    if ( picArray && picArray.length > 0) {
      return this.generalService.reqWithImgs(postType, body, userId, token, picArray ).pipe(map((res: any) => {
        return res;
      }),
      catchError(this._handleError.handleError));
    }

    const url = urlService + '/api/post/' + userId;
    const headers = this.generalService.getHeaders(token);

    return this.http.post<Post>(url, body, headers).pipe(map((res: any) => {
      return res;
    }),
    catchError(this._handleError.handleError));

  }



}

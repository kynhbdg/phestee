import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

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


  createPost( post: Post, id: string, token: string) {
    const url = urlService + '/api/post/' + id;
    const headers = this.generalService.getHeaders(token);
    return this.http.post(url, post, headers).pipe(map( (res: any) => {
      return res.post;
    }), catchError(this._handleError.handleError));

  }



}

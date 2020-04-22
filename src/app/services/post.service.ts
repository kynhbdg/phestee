import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap, take } from 'rxjs/operators';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';

import { urlService } from '../config/config';

import { Post } from '../models/post.model';

import { GeneralService } from './general.service';
import { HandleErrorService } from './handle-error.service';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  urlPost = urlService + '/api/post/';
  incPost = new Subject<void>();
  allPosts = new BehaviorSubject<any>('');
  postsByUserId = new BehaviorSubject<any>('');

  // posts = new BehaviorSubject<any>(null); We may need to use this for autorefresh in Feed...

  constructor(
    public generalService: GeneralService,
    public _handleError: HandleErrorService,
    public http: HttpClient,
    public _userService: UserService
  ) { }

  get getIncPost() {
    return this.incPost;
  }

  getPosts(token: string): Observable<any> {
    const headers = this.generalService.getHeaders(token);
    return this.http.get<any>(this.urlPost, headers ).pipe(map( posts => {
      this.allPosts.next(posts);
      return posts.post;
    }),
    catchError(this._handleError.handleError));

  }

  getPostsByUserID(token: string, userId: string): Observable<any> {
    const headers = this.generalService.getHeaders(token);
    return this.http.get<any>(this.urlPost + userId, headers).pipe(map( posts => {
      console.log(posts);
      this.postsByUserId.next(posts);
      return posts;
    }),
    catchError(this._handleError.handleError));
  }


  createPost( postType: string, body: any, userId: string, token: string, picArray?: Array<File>): Observable<any> {


    if ( picArray && picArray.length > 0) {
      return this.generalService.reqWithImgs(postType, body, userId, token, picArray ).pipe(map((res: any) => {
        return res;
      }),
      tap( post => {
        this.getIncPost.next(post);
      }),
      catchError(this._handleError.handleError));
    }

    const url = this.urlPost + userId;
    const headers = this.generalService.getHeaders(token);

    return this.http.post<Post>(url, body, headers).pipe(map((res: any) => {
      return res;
    }),
    tap( post => {
      this.getIncPost.next(post);
    }),
    catchError(this._handleError.handleError));

  }



}

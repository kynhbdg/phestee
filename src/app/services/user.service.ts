import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Plugins } from '@capacitor/core';

import { from, of, BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Bus } from '../models/bus.model';
import { User } from '../models/user.model';

import { urlService } from '../config/config';

import { HandleErrorService } from './handle-error.service';
import { GeneralService } from './general.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<User>(null);
  bus: Bus;
  token = new BehaviorSubject<string>(null);

  constructor(
        public http: HttpClient,
        public _handleError: HandleErrorService,
        public generalService: GeneralService
              ) {
     this.loadStorage();
  }

  loadStorage() {

    return from (Plugins.Storage.get({key: 'userData'})).pipe(map(storedData => {
      if (!storedData || !storedData.value) {
        return null;
      }
      const parsedData = JSON.parse(storedData.value) as {
        id: string,
        token: string,
        user: User,
        bus: Bus
      };

      if ( !parsedData.token ) {
        return false;
      } else {
        this.user.next(parsedData.user);
        this.token.next(parsedData.token);
        return !!parsedData.token;
      }

    }));
  }

  get userLoggedIn() {
    return this.token.asObservable().pipe(map( token => {
        if (this.user) {
          return !!token;
        } else {
          return false;
        }
      }));
  }

  get tokenId() {
    return this.token.asObservable().pipe(map( tokenId => {
      if(this.user) {
        return tokenId;
      } else {
        return null;
      }
    }));
  }


  login( user: User ) {
    const url = urlService + '/user/login';
    return this.http.post<User>(url, user).pipe(
      map( (res: any) => {
      this.token.next(res.token);
      this.user.next(res.user);
      this.saveStorage(res.user._id, res.token, res.user, res.bus );
      return true;
    }),
     catchError(this._handleError.handleError));
  } // end login


  createUser(user: User) {
    const url = urlService + '/user/signin';
    return this.http.post<User>(url, user).pipe(
      map( (res: any) => {
      this.token.next(res.token);
      this.user.next(res.user);
      this.saveStorage(res.user._id, res.token, res.user, res.bus );
      return true;
    }),
    catchError(this._handleError.handleError));
  }// end createUser

  loadImgProfile(postType: string, body: any, id: string, token: string, imgProcessed: File): Observable<any> {
    return this.generalService.reqWithImgs(postType, body, id, token, [], imgProcessed ).pipe(map((res: any) => {
      return res;
    }),
    catchError(this._handleError.handleError));
  }

  saveStorage( id: string, token: string, user: User, bus: Bus ) {

    const userData = JSON.stringify({
      id,
      token,
      user,
      bus
    });

    Plugins.Storage.set({
      key: 'userData',
      value: userData
    });

  }// end saveStorage

  updateUser(user: User,iduser: string,token: string)
  {
    const httpOptions = this.generalService.getHeaders(token);
    let url = urlService + '/api/user/' +iduser;
    return this.http.put<User>(url, user, httpOptions).pipe(
      map( (res: any) => {
      this.token.next(res.token);
      this.user.next(res.user);
      this.saveStorage(res.user._id, res.token, res.user, res.bus );
      return true;
    }),
    catchError(this._handleError.handleError));
  }// end updateUser

  logout() {
    this.token.next(null);
    this.user.next(null);
    Plugins.Storage.remove( {key: 'userData'} );
  }


}

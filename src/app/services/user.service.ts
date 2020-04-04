import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Bus } from '../models/bus.model';
import { User } from '../models/user.model';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { urlService } from '../config/config';
import { HttpHeaders } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token:string;
  constructor(public http: HttpClient,
              public _handleError: HandleErrorService)
  {
     this.loadStorage();
  }

  login( user: User, rememberme: boolean = false ) {

    if (rememberme) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = urlService + '/user/login';
    return this.http.post (url, user).pipe(map( (res: any) => {
      console.log("Res: "+JSON.stringify(res));
      this.saveStorage(res.user._id, res.token, res.user, res.bus );
      return true;
    }),
     catchError(this._handleError.handleError));
  } // end login

  saveStorage( id: string, token: string, user: User, bus: Bus ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('bus', JSON.stringify(bus));

    this.user = user;
    this.token = token;
  }// end saveStorage

  createUser(user: User)
  {
    let url = urlService + '/user/signin';
    return this.http.post(url, user).pipe(map( (res: any) => {
      return true;
    }),
    catchError(this._handleError.handleError));
  }// end createUser

  userLoggedIn() {
    if(this.token !== undefined)
    {
      if(this.token.length > 5)
        return true;
      else
       return false;
    }
    else
     return false;
  }// end userLoggedIn

  loadStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    else {
      this.token = '';
      this.user = null;
    }
  } // end loadStorage






}

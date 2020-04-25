import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Plugins } from '@capacitor/core';

import { from, of, BehaviorSubject, Observable, Subject } from 'rxjs';
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

  bus: Bus;
  user = new BehaviorSubject<User>(null);
  token = new BehaviorSubject<string>(null);
  incBus = new Subject<void>();
  userBusUrl = urlService + '/api/user/bus/';
  editBusUrl = urlService + '/api/bus/';

  constructor(
        public http: HttpClient,
        public _handleError: HandleErrorService,
        public generalService: GeneralService,
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

    this.loadStorage();

  }// end saveStorage

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
  get userId() {
    return this.user.asObservable().pipe(map( user => {
      if (this.user) {
        return user._id;
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

  updateBus( postType: string, body: any, userId: string, token: string,  busId?: string, imgProcessed?: File): Observable<any> {


    // pending for bus Image change
    // if ( imgProcessed) {
    //   return this.generalService.reqWithImgs(postType, body, userId, token, [], imgProcessed ).pipe(map((res: any) => {
    //     return res;
    //   }),
    //   catchError(this._handleError.handleError));
    // }

    const urlCreate = this.userBusUrl + userId;
    const headers = this.generalService.getHeaders(token);

    if (!busId) {
      return this.http.post<Bus>(urlCreate, body, headers).pipe(map((res: any) => {
        this.saveStorage(res.user._id, res.token, res.user, res.bus);
        return res;
      }),
      tap( bus => {
        this.incBus.next(bus.user.ownedBus);
      }),
      catchError(this._handleError.handleError));

    }

    const urlUpdateBus = this.editBusUrl + busId;

    return this.http.put<Bus>(urlUpdateBus, body, headers).pipe(map((res: any) => {
      console.log(res);
      return res;
    }),
    tap( bus => {
      this.incBus.next(bus.user.ownedBus);
    }),
    catchError(this._handleError.handleError));


  }

  logout() {
    this.token.next(null);
    this.user.next(null);
    Plugins.Storage.remove( {key: 'userData'} );
  }


}

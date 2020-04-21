import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginguardGuard implements CanActivate {

  constructor(public _userService: UserService,
              public router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      return this._userService.userLoggedIn.pipe(take(1),
        switchMap(isAuthenticated => {
          if (!isAuthenticated) {
            return this._userService.loadStorage();
          } else {
            return of (isAuthenticated);
          }
        }),
        tap( isAuthenticated => {
          if (!isAuthenticated) {
            console.log('bloqueado por el login guard');
            this.router.navigateByUrl('/login');
          }
          console.log('pasó por el login guard');

      }));


  }// end CanActivate
}// End LoginguardGuard

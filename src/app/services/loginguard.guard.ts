import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
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

    if ( this._userService.userLoggedIn() ){
        console.log('pasó por el login guard');
        return true;
    } else {
        console.log('bloqueado por el login guard');
        this.router.navigateByUrl('/login');
        return false;
    }

  }// end CanActivate
}// End LoginguardGuard

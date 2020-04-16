import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

import { Plugins, Capacitor } from '@capacitor/core';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private authSub: Subscription;
  private previousAuthState = false;

  pages = [
    {
      title: 'Ajustes de Perfil',
      icon: 'settings-outline',
      url: '/pages/tabs/user/user-settings'
    },
    {
      title: 'Archivo',
      icon: 'archive-outline',
      url: 'pending'
    },
    {
      title: 'Membresía',
      icon: 'person-outline',
      url: 'pending'
    },
    {
      title: 'TyC',
      icon: 'shield-checkmark-outline',
      url: 'pending'
    },
    {
      title: 'Feedback',
      icon: 'document-text-outline',
      url: 'pending'
    },
    {
      title: 'Información',
      icon: 'information-circle-outline',
      url: 'pending'
    }


  ]


  constructor(
    private platform: Platform,
    private _userService: UserService,
    private router: Router
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      if ( Capacitor.isPluginAvailable('SplashScreen') ) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  ngOnInit() {
    this.authSub = this._userService.userLoggedIn.subscribe( isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl('/login');
      }
      this.previousAuthState = isAuth;
    });
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  onLogout() {
    this._userService.logout();
    this.router.navigateByUrl('/login');
  }
}

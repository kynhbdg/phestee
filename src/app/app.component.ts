import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

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
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

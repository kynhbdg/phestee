import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';


if (environment.production) {
  enableProdMode();
}


// Below code is important for activation of camera in PWA (this is from npm install @ionic/pwa-elements)
platformBrowserDynamic()
.bootstrapModule(AppModule)
.catch(err => console.log(err));

// Call the element loader after the platform has been bootstrapped (this is also from the pwa install stuff)
defineCustomElements(window);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

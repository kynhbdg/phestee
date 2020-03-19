import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CameraService } from '../../services/camera.service';

// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from '../../app.module';
// import { environment } from '../../../environments/environment';

// import { defineCustomElements } from '@ionic/pwa-elements/loader';

// if (environment.production) {
//   enableProdMode();
// }

// // Below code is important for activation of camera in PWA (this is from npm install @ionic/pwa-elements)
// platformBrowserDynamic()
// .bootstrapModule(AppModule)
// .catch(err => console.log(err));

// // Call the element loader after the platform has been bootstrapped (this is also from the pwa install stuff)
// defineCustomElements(window);

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.page.html',
  styleUrls: ['./post-modal.page.scss'],
})
export class PostModalPage implements OnInit {

  constructor(
    private modalController: ModalController,
    public cameraService: CameraService
  ) { }


  ngOnInit() {
  }

  closeModal() {
    // this.router.navigateByUrl('/pages/tabs/feed');
    this.modalController.dismiss();
  }

  openCamera() {
    this.cameraService.addNewToGallery();
  }

}

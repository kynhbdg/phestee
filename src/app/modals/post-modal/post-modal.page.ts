import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CameraService } from '../../services/camera.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  postForm: FormGroup;
  isIncognitoFlag: true;



  constructor(
    private modalController: ModalController,
    public cameraService: CameraService,
    public router: Router
  ) {
    this.postForm = new FormGroup({
      postString: new FormControl( '', [Validators.required, Validators.maxLength(210)] ),
      // postImage: new FormControl(),
      // postWhere: new FormControl(),
      postWhen: new FormControl(),
      isIncognito: new FormControl(true),
      isProf: new FormControl(true),
      isCommunity: new FormControl(false)
    });
   }

  ngOnInit() {

    this.onFormChanges();

  }

  get postStringControl() {
    return this.postForm.get('postString');
  }
  get postImageControl() {
    return this.postForm.get('postImage');
  }
  get postWhereControl() {
    return this.postForm.get('postWhere');
  }
  get postWhenControl() {
    return this.postForm.get('postWhen');
  }
  get isIncognitoControl() {
    return this.postForm.get('isIncognito');
  }
  get isProfControl() {
    return this.postForm.get('isProf');
  }
  get isCommunityControl() {
    return this.postForm.get('isCommunity');
  }

  onFormChanges(): void {
    this.postForm.valueChanges.subscribe( () =>  {
      this.isIncognitoFlag = this.isIncognitoControl.value;
    });

  }

  onCloseModal() {
    // this.router.navigateByUrl('/pages/tabs/feed');
    this.modalController.dismiss();
  }

  onTakePhoto() {
    this.cameraService.addNewToGallery();
  }

  removePhotoCarrsl(i: number) {
    this.cameraService.removePhotoCarroussel(i);
  }

  onCreatePost() {
    console.log(this.cameraService.photos);
    console.log(this.postForm.value);

    // add call to backend for saving Post

    this.cameraService.photos = [];
    this.router.navigate(['/', 'pages', 'tabs', 'experiences']);
    this.modalController.dismiss();
  }

}

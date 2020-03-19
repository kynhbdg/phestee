import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';

import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource
} from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class CameraService {



  public photos: Photo[] = [];
  private platform: Platform;

  // cameraFile: SafeResourceUrl;

  constructor( 
    private domSanitizer: DomSanitizer,
    platform: Platform ) {
      this.platform = platform; // we only need this if we want to allow pictures from the device
     }


  public async addNewToGallery() {

    const { Camera, Filesystem, Storage } = Plugins;

    console.log('is this entering?');
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
    });

    this.photos.unshift({
      filepath: 'soon...',
      webviewPath: capturedPhoto.webPath
    });

    console.log(capturedPhoto);

  }

}

interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}



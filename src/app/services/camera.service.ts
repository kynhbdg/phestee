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


function base64toBlob(base64Data: any, contentType: any) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);
  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);
    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

interface Photo {
  webviewPath: string;
  base64?: string;
}


@Injectable({
  providedIn: 'root'
})
export class CameraService {



  public photos: Photo[] = [];
  public picFiles: any[] = [];
  selectedImage: string;

  // cameraFile: SafeResourceUrl;

  constructor(
    private domSanitizer: DomSanitizer,
    private platform: Platform) {}


  addNewPhoto() {
    if ( !Capacitor.isPluginAvailable('Camera') ) {
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 70,
      source: CameraSource.Prompt,
      allowEditing: true,
      correctOrientation: true,
      resultType: CameraResultType.DataUrl
    })
    .then( image => {
      this.photos.unshift({
        webviewPath: image.dataUrl,
      });
      this.uploadFiles(image.dataUrl);
    })
    .catch( error => {
      console.log(error);
      return false;
    });
  }

  uploadFiles(image: string) {
    // console.log(image);

    const curatedDataUrl = image.replace('data:image/jpeg;base64,', '');
    try {
      const file =  base64toBlob(curatedDataUrl, 'image/jpeg');
      this.picFiles.unshift(file);
      console.log(this.picFiles);
    } catch (error) {
      console.log(error);
    }

    // const frmData = new FormData();

    // for (const fileArray of photos) {
    //   console.log(fileArray.webviewPath);
    //   try {
    //     const curatedDataUrl = fileArray.webViewPath.replace('data:image/jpeg;base64,', '');
    //     console.log(curatedDataUrl);
    //     // const file =  base64toBlob(fileArray.webViewPath.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
    //     // this.picFiles.unshift(file);

    //   } catch(error) {
    //     console.log(error);
    //   }
    // }

  }



  removePhotoCarroussel(i: number) {
    this.photos.splice(i, 1);
  }

}





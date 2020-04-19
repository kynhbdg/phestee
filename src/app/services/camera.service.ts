import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';

import { NgxImageCompressService } from 'ngx-image-compress';

import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource
} from '@capacitor/core';

import { of, BehaviorSubject } from 'rxjs';

interface Photo {
  webviewPath: string;
  base64?: string;
}

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const fileName = 'pic' + Date.now().toString();
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
  const blob =  new Blob(byteArrays, { type: contentType });
  return  new File([blob], fileName);
}


@Injectable({
  providedIn: 'root'
})
export class CameraService {

  picUrl: Photo[] = [];
  picFiles: any[] = [];
  imgAfterCompress: string;
  singleimgFile = new BehaviorSubject(null);

  constructor(
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private imageCompress: NgxImageCompressService) {}


    removePhotoCarroussel(i: number) {
      this.picUrl.splice(i, 1);
      this.picFiles.splice(i, 1);
    }

    addNewPhoto() {
      if ( !Capacitor.isPluginAvailable('Camera') ) {
        return;
      }
      Plugins.Camera.getPhoto({
        quality: 100,
        source: CameraSource.Prompt,
        allowEditing: true,
        correctOrientation: true,
        resultType: CameraResultType.DataUrl
      })
      .then( image => {
        this.addPhotoArray(image.dataUrl);
      })
      .catch( error => {
        console.log(error);
        return false;
      });
    }

    addPhotoArray(imgString?: string) {
      this.picUrl.unshift({
        webviewPath: imgString,
      });
      this.compressFile(imgString);
    }

    compressFile(img: string) {
      const ratio = 80;
      const quality = 80;

      this.imageCompress.compressFile(img, ratio, quality).then(
        result => {
          this.imgAfterCompress = result;
          const curatedUrl = result.replace('data:image/jpeg;base64,', '');
          try {
            const imgFile =  base64toBlob(curatedUrl, 'image/jpeg');
            this.picFiles.unshift(imgFile);
            this.singleimgFile.next(imgFile);
          } catch (error) {
            console.log(error);
          }
      });

    }

}

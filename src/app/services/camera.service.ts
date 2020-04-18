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



  picURL: Photo[] = [];
  picFiles: any[] = [];
  imgAfterCompress: string;
  // selectedImage: string;
  // imgProcessed: File;

  // cameraFile: SafeResourceUrl;

  constructor(
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private imageCompress: NgxImageCompressService) {}


    removePhotoCarroussel(i: number) {
      this.picURL.splice(i, 1);
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
      this.picURL.unshift({
        webviewPath: imgString,
      });
      this.compressFile(imgString);
    }

    compressFile(imgUrl: string) {
      const ratio = 80;
      const quality = 80;

      this.imageCompress.compressFile(imgUrl, ratio, quality).then(
        result => {
          this.imgAfterCompress = result;
          const curatedUrl = result.replace('data:image/jpeg;base64,', '');
          try {
            const imgFile =  base64toBlob(curatedUrl, 'image/jpeg');
            this.picFiles.unshift(imgFile);
          } catch (error) {
            console.log(error);
          }
      });

    }

  //   resizeImages(file: any, width: number, callback: any) {
  //   let tempImgFunction;
  //   const fileName = file.name;
  //   const reader = new FileReader();
  //   reader.readAsDataURL (file);
  //   reader.onload = event => {
  //     const img = new Image();
  //     img.src = (event.target as any).result;
  //     img.onload = () => {
  //       const elem = document.createElement('canvas');
  //       const scaleFactor = width / img.width;
  //       elem.width = width;
  //       elem.height = img.height * scaleFactor;
  //       const ctx = elem.getContext('2d');
  //       ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
  //       ctx.canvas.toBlob((blob) => {
  //         const fileFinal = new File([blob], fileName, {
  //           type: 'image/jpeg',
  //           lastModified: Date.now()
  //         });
  //         tempImgFunction = reader.result;
  //         callback(fileFinal, tempImgFunction);
  //       }, 'image/jpeg', 1);
  //     },
  //     reader.onerror = error => alert('Error en cambiar imagen: ' + error);
  //   };

  // }

}

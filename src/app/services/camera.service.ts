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

interface Photo {
  webviewPath: string;
  base64?: string;
}

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024; // 512?
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


@Injectable({
  providedIn: 'root'
})
export class CameraService {



  public picURL: Photo[] = [];
  public picFiles: any[] = [];
  selectedImage: string;
  tempPostImg: any;
  imgProcessed: File;

  // cameraFile: SafeResourceUrl;

  constructor(
    private domSanitizer: DomSanitizer,
    private platform: Platform) {}


    removePhotoCarroussel(i: number) {
      this.picURL.splice(i, 1);
    }

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
      this.generateFiles(imgString);
    }


  generateFiles(image: string) {

    const width = 500;

    try {
      const imgFile =  base64toBlob(image.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
      this.resizeImages(imgFile, width, (fileFinal: any, tempImgFunction: any) => {
        this.imgProcessed = fileFinal;
        this.tempPostImg = tempImgFunction;
        console.log(this.imgProcessed);
        this.picFiles.unshift(this.imgProcessed);
      });
      // console.log(imgFile);
    } catch (error) {
      console.log(error);
    }

  }


  resizeImages(file: any, width: number, callback: any) {
        let tempImgFunction;
        const fileName = file.name;
        const reader = new FileReader();
        reader.readAsDataURL (file);
        reader.onload = event => {
          const img = new Image();
          img.src = (event.target as any).result;
          img.onload = () => {
            const elem = document.createElement('canvas');
            const scaleFactor = width / img.width;
            elem.width = width;
            elem.height = img.height * scaleFactor;
            const ctx = elem.getContext('2d');
            ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
            ctx.canvas.toBlob((blob) => {
              const fileFinal = new File([blob], fileName, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              tempImgFunction = reader.result;
              callback(fileFinal, tempImgFunction);
            }, 'image/jpeg', 1);
          },
          reader.onerror = error => alert('Error en cambiar imagen: ' + error);
        };

  } // end resizeImages

}





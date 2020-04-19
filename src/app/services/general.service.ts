import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { take, map } from 'rxjs/operators';

import { UserService } from './user.service';
import { urlService } from '../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  httpOptions: any;
  token: any;

  constructor(
  ) {
   }


  getHeaders(token: string) {
      return this.httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      })
    };

  }

  reqWithImgs( postType: string, body: any, userId: string, token: string, picArray?: Array<File>, singlePic?: File) {


    return new Observable((observer) => {


      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      const postUrl = urlService + '/api/post/' + userId;
      const userUrl = urlService + 'api/user/' + userId;

      if ( postType === 'postUser') {

        formData.append('userId', body.userId);
        formData.append('userImage', body.userImage);
        formData.append('userName', body.userName);
        formData.append('incognito', body.incognito);
        formData.append('scopeLimited', body.scopeLimited);
        formData.append('post', body.post);
        formData.append('postedDate', body.postedDate);
        formData.append('isActive', body.isActive);
        formData.append('status', body.status);
        for (const [i, photo] of picArray.entries()) {
          formData.append('postImages', photo, `x${i}.jpg` );
        }

        xhr.open('POST', postUrl, true);
        xhr.setRequestHeader('Authorization', token);
        xhr.onreadystatechange = () => {
          if ( xhr.readyState === 4) {
            if ( xhr.status === 200) {
              console.log('imagen subida');
              observer.next(JSON.parse( xhr.response ));
            } else {
              console.log('Upload image failed');
              observer.next(xhr.response);
            }
          }
        };

        xhr.send(formData);
      }

      if ( postType === 'userProfile' && singlePic) {

        console.log('did we make it here?');
        formData.append('lastUpdated', body);
        formData.append('userImage', singlePic, 'userAvatar.jpg');

        xhr.open('PUT', userUrl, true);
        xhr.setRequestHeader('Authorization', token);
        xhr.onreadystatechange = () => {
          if ( xhr.readyState === 4) {
            if ( xhr.status === 200) {
              console.log('imagen subida');
              observer.next(JSON.parse( xhr.response ));
            } else {
              console.log('Upload image failed');
              observer.next(xhr.response);
            }
          }
        };

        xhr.send(formData);
      }

    });
  }

}

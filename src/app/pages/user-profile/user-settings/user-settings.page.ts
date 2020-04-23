import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionSheetController, AlertController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';

import { User } from '../../../models/user.model';
import { PlaceLocation } from '../../../models/location.model';

import { UserService } from 'src/app/services/user.service';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit, OnDestroy {

  userSettingForm: FormGroup;
  pwdResetForm: FormGroup;
  user: User;
  pwdUpdateMatch = false;
  userSubs: Subscription;
  tokenSubs: Subscription;
  token: string;
  loadImgSubs: Subscription;

  citiesJal = [
    'El Salto',
    'Guadalajara',
    'Tlajomulco',
    'Tlaquepaque',
    'Tonalá',
    'Zapopan',
    'Otra'
  ];



  constructor(
    public actionSheetController: ActionSheetController,
    public _userService: UserService,
    public cameraService: CameraService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {

    this.userSettingForm = new FormGroup({
      name: new FormControl( '', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl( '', [Validators.required, Validators.email] ),
      phone: new FormControl('', [Validators.minLength(10), Validators.maxLength(10) ]),
      birthday: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl( {value: 'Jalisco', disabled: true} ),
      country: new FormControl( {value: 'México', disabled: true} ),
      userLocation: new FormControl(null)
    });

    this.pwdResetForm = new FormGroup({
      oldPwd: new FormControl('', [Validators.required]),
      newPwd: new FormControl('', [Validators.required]),
      confirmPwd: new FormControl('', [Validators.required]),
    });

    this.userSubs =  this._userService.user.subscribe( userData => {
      this.user = userData;
      this.userSettingForm.patchValue(userData);
    }, error => console.log('Error: ' + error));

    this.tokenSubs = this._userService.token.subscribe( tokenId => {
      this.token = tokenId;
    }, error => console.log('Error: ' + error));



    this.onPwdCheck();

  }


get nameForm() {
  return this.userSettingForm.get('name');
}

get userNameForm() {
  return this.userSettingForm.get('userName');
}

get emailForm() {
  return this.userSettingForm.get('email');
}

get phoneForm() {
  return this.userSettingForm.get('phone');
}

get oldPwdForm() {
  return this.pwdResetForm.get('oldPwd');
}

get newPwdForm() {
  return this.pwdResetForm.get('newPwd');
}

get confirmPwdForm() {
  return this.pwdResetForm.get('confirmPwd');
}

onLocationPicked(location: PlaceLocation) {
  console.log(location);
  this.userSettingForm.patchValue({userLocation: location});

}

  onPwdCheck() {
    this.oldPwdForm.valueChanges.subscribe( oldPwdCheck => {
      // validate oldPwd wth backend, if correct ? maybe we don't need it
    });

    this.confirmPwdForm.valueChanges.subscribe( confirmPwd => {
      this.pwdUpdateMatch = confirmPwd === this.newPwdForm.value ? true : false;
      console.log(this.pwdUpdateMatch);
    });

  }

  onTakePhoto() {
    this.cameraService.addNewPhoto();

    this.loadImgSubs = this.cameraService.singleimgFile.subscribe( imgReady => {
      console.log(imgReady);
      this.onUserUpdate(imgReady);
    });

  }

  onUserUpdate(img?: File) {
    const lastUpdated = new Date(Date.now());
    if (img) {
      this._userService.loadImgProfile('userProfile', lastUpdated, this.user._id, this.token, img ).subscribe( res => {
        console.log(res);
      }, error => console.log('Error: ' + error));
    }
  }

  onPwdUpdate() {
    console.log(this.pwdResetForm.value);
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
    this.tokenSubs.unsubscribe();
    this.loadImgSubs.unsubscribe();
  }

}

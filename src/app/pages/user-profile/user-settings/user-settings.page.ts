import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ActionSheetController } from '@ionic/angular';

import { User } from '../../../models/user.model';
import { PlaceLocation } from '../../../models/location.model';
import { UserService } from 'src/app/services/user.service';
import { take, map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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
    public _userService: UserService
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
      console.log(userData);
      this.userSettingForm.patchValue(userData);
    });

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

  async presentPhotoOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actualizar foto de perfil',
      buttons: [{
        text: 'Tomar foto',
        icon: 'camera-outline',
        handler: () => {
          console.log('abrir camara');
          }
        },
        {
          text: 'Abrir galeria',
          icon: 'images-outline',
          handler: () => {
            console.log('abrir galeria');
          }
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          icon: 'close-circle-outline',
          handler: () => {
            console.log('abrir galeria');
          }
        }
      ]
    });

    await actionSheet.present();

  }

  onUserUpdate() {
    console.log(this.userSettingForm.value);
  }

  onPwdUpdate() {
    console.log(this.pwdResetForm.value);
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

}

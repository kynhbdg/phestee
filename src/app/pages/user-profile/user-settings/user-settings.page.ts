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
  addressUser: PlaceLocation;
  pwdMatchFlag: boolean;

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


  pwdMatch( pwd1: string, pwd2: string ) {

    return( group: FormGroup ) => {

      let value1 = group.controls[pwd1].value;
      let value2 = group.controls[pwd2].value;
      if (value1 === value2) {
          return null;
      }
      return{ pwdMatch: true };
    };
  }
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
      confirmPwd: new FormControl('', [Validators.required])
    },
    { validators: this.pwdMatch('newPwd', 'confirmPwd')});

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

  checkPwd(event: any)
  {
    if(this.pwdResetForm.value.newPwd == event.target.value)
      this.pwdMatchFlag = true;
    else
      this.pwdMatchFlag = false;
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
    } // end if

    this.user.name = this.userSettingForm.getRawValue().name;
    this.user.userName = this.userSettingForm.getRawValue().userName;
    this.user.phone = this.userSettingForm.getRawValue().phone;
    //this.user.birthDate = this.userSettingForm.getRawValue().birthday;
    this.user.city = this.userSettingForm.getRawValue().city;
    this.user.state = this.userSettingForm.getRawValue().state;
    this.user.country = this.userSettingForm.getRawValue().country;
    this.user.email = this.userSettingForm.getRawValue().email;
    //ACHTUNG! i will add this code when ramon change the updateuser in the back.
    /*this.addressUser.addressComponents.city = this.userSettingForm.getRawValue().city;
    this.addressUser.addressComponents.state = this.userSettingForm.getRawValue().state;
    this.addressUser.addressComponents.country = this.this.userSettingForm.getRawValue().country;
    this.user.userLocation = this.addressUser;*/
    this._userService.updateUser(this.user,this.user._id,this.token).subscribe(data => alert('Se actualizaron los datos del usuario'),error => {
      let duplicateUserName = error.indexOf("userName_1 dup key:");
      let duplicateEmail = error.indexOf("email_1 dup key:");
      if(duplicateUserName >= 0 || duplicateEmail >= 0)
      {
          if(duplicateUserName >= 0)
            alert("El usuario ingresado ya existe. Por favor de ingresar otro usuario.");

          if(duplicateEmail >= 0)
            alert("El correo ingresado ya existe. Por favor de ingresar otro correo.");
      }
      else
        alert(error);


    });
  }

  onPwdUpdate() {
    //ACHTUNG! The old password validation is pending!
      this.user.password = this.pwdResetForm.getRawValue().oldPwd;
      this.user.newPassword = this.pwdResetForm.getRawValue().newPwd;
      this._userService.updateUser(this.user,this.user._id,this.token).subscribe(data => alert('La contraseña se ha cambiado con éxito'),error => alert(error));
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
    this.tokenSubs.unsubscribe();
    this.loadImgSubs.unsubscribe();
  }

}

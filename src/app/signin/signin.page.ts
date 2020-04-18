import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoadingController, AlertController } from '@ionic/angular';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  signinForm: FormGroup;
  pwdMatchCheck: boolean;
  conditionsTrue = true;
  pwdMatchFlag: boolean;

  constructor(
    public _userService: UserService,
    public router: Router,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

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
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl(''),
      userName: new FormControl(''),
      pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
      pwdConf: new FormControl('', Validators.required),
      tyc: new FormControl(false, Validators.requiredTrue),
    },
      { validators: this.pwdMatch('pwd', 'pwdConf')});

    this.onChanges();
  }

  get emailControl() {
    return this.signinForm.get('email');
  }
  get userNameControl() {
    return this.signinForm.get('userName');
  }
  get pwdControl() {
    return this.signinForm.get('pwd');
  }
  get pwdConfControl() {
    return this.signinForm.get('pwdConf');
  }
  get tycControl() {
    return this.signinForm.get('tyc');
  }

  checkPwd()
  {
    if(this.signinForm.value.pwd == this.signinForm.value.pwdConf)
      this.pwdMatchFlag = true;
    else
      this.pwdMatchFlag = false;
  }

  private onChanges() {
    this.pwdConfControl.valueChanges.subscribe((pwd) => {
      this.pwdMatchCheck = this.pwdControl.value === pwd ? true : false;

    });
  }

  onUserSignin() {
    if (!this.signinForm.value.tyc) {
      this.conditionsTrue = false;
      return;
    } else {
      this.conditionsTrue = true;
    }
    if (this.signinForm.invalid) {
      return;
    }
    const user = new User(
      this.signinForm.value.email,
      this.signinForm.value.pwd,
      this.signinForm.value.userName,
      this.signinForm.value.tyc
    );

    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: 'Creando cuenta...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this._userService.createUser(user).subscribe(
          (res) => {
            loadingEl.dismiss();
            this.router.navigateByUrl('/pages/tabs/experiences');
          },
          (error) => {
            loadingEl.dismiss();
            let duplicateUserName = error.indexOf("userName_1 dup key:");
            let duplicateEmail = error.indexOf("email_1 dup key:");

            if(duplicateUserName >= 0 || duplicateEmail>= 0)
            {
                if(duplicateUserName >= 0)
                  this.showAlert("El usuario ingresado ya existe. Por favor de ingresar otro usuario.");

                if(duplicateEmail >= 0)
                  this.showAlert("El correo ingresado ya existe. Por favor de ingresar otro correo.");
            }
            else
              this.showAlert(error);




          });
      });

    this.signinForm.reset();
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({ header: 'Registro', message, buttons: ['OK'] })
      .then((alertEl) => alertEl.present());
  }
}

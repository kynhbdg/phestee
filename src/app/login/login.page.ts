import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading = false;
  loginForm: FormGroup;

  constructor(
    public router: Router,
    private loadingCtrl: LoadingController,
    public _userService: UserService,
    public alertCtrl: AlertController

  ) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl( '', [Validators.required, Validators.email] ),
      password: new FormControl( '', [ Validators.required, Validators.minLength(8) ])
    });

  }

  get emailForm() {
    return this.loginForm.get('email');
  }
  get passwordForm() {
    return this.loginForm.get('password');
  }

  onUserLogin() {

    if (this.loginForm.invalid) {
      return;
    }

    const user = new User(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Abriendo cuenta...',
    })
    .then((loadingEl) => {
      loadingEl.present();
      this._userService.login(user).subscribe(
        (res) => {
          console.log(res);
          loadingEl.dismiss();
          this.router.navigateByUrl('/pages/tabs/experiences');
        },
        (error) => {
          loadingEl.dismiss();
          let userNotFound = error.indexOf("User not found");
          let incorrectPwd = error.indexOf("Incorrect password");
          if(userNotFound >= 0 || incorrectPwd >=0)
          {
              if(userNotFound >= 0)
                this.showAlert("El usuario no se ha encontrado.");
              if(incorrectPwd >= 0)
                this.showAlert("La contraseña es incorrecta.");
          }
          else
            this.showAlert(error);
        });
    });

    this.loginForm.reset();

  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({ header: 'Login', message, buttons: ['OK'] })
      .then((alertEl) => alertEl.present());
  }

}

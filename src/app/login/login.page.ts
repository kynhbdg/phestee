import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
  rememberme = false;

  constructor(
    public router: Router,
    private loadingCtrl: LoadingController,
    public _userService: UserService

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
    console.log(this.loginForm.value);
    this.router.navigateByUrl('/pages/tabs/feed');
    if (this.loginForm.invalid)
    {
      return;
    }
    let user = new User(null, this.loginForm.value.email, this.loginForm.value.password);
    this._userService.login(user, false).subscribe(
      () => this.router.navigateByUrl('/pages/tabs/feed'), error =>{
        alert("Por favor ingrese sus datos correctamente: "+error);
      });
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Abriendo cuenta...' })
      .then( loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/pages/tabs/feed');
        }, 1500);
      });

  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  signinForm: FormGroup;

  constructor() { }

  ngOnInit() {

    this.signinForm = new FormGroup({
      email: new FormControl( '', [Validators.required, Validators.email] ),
      userName: new FormControl(''),
      password1: new FormControl( '', [ Validators.required, Validators.minLength(8) ]),
      password2: new FormControl( null, Validators.required ),
      tyc: new FormControl( false, Validators.requiredTrue)
    });

  }

  get emailForm() {
    return this.signinForm.get('email');
  }
  get userProfileForm() {
    return this.signinForm.get('userName');
  }
  get passwordForm() {
    return this.signinForm.get('password1');
  }
  get password2Form() {
    return this.signinForm.get('password2');
  }
  get tycForm() {
    return this.signinForm.get('tyc');
  }

  onUserSignin() {
    console.log(this.signinForm.value);
    // this.signinForm.reset();
  }

}

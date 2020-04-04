import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  signinForm: FormGroup;
  pwdMatchCheck = true;
  conditionsTrue = true;

  constructor(
    public _userService: UserService,
    public router: Router
  ) { }

  pwdMatch( pwd1: string, pwd2: string ) {

    return( group: FormGroup ) => {

// tslint:disable-next-line: prefer-const
    let value1 = group.controls[pwd1].value;
// tslint:disable-next-line: prefer-const
    let value2 = group.controls[pwd2].value;
    if (value1 === value2) {
        return null;
      }
    return{ pwdMatch: true };
    };
  }

  ngOnInit() {

    this.signinForm = new FormGroup({
      email: new FormControl( '', [Validators.required, Validators.email] ),
      userName: new FormControl(''),
      password1: new FormControl( '', [ Validators.required, Validators.minLength(8) ]),
      password2: new FormControl( null, Validators.required ),
      tyc: new FormControl( false, Validators.requiredTrue)
    },
      { validators: this.pwdMatch('password1', 'password2')});

    this.onChanges();

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

  onChanges() {
    this.signinForm.get('password2').valueChanges.subscribe( pwd => {
        if (this.signinForm.get('password1').value === pwd) {
          this.pwdMatchCheck = true;
        } else {
          this.pwdMatchCheck = false;
        }
    });
  }

  onUserSignin() {
    if (!this.signinForm.value.tyc) {
      this.conditionsTrue = false;
      return;
    } else {
      this.conditionsTrue = true;
    }
    if ( this.signinForm.invalid) {
      console.log("Formulario invalido.");
      return;
    }
    localStorage.setItem('email', this.signinForm.value.email);
    const user = new User(
      this.signinForm.value.userName,
      this.signinForm.value.email,
      this.signinForm.value.password1,
      this.signinForm.value.tyc
     );
    this._userService.createUser(user).subscribe(res => this.router.navigateByUrl('/login') ,error => alert('Error: '+error));

  }

}

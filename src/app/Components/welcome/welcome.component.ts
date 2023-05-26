import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Servecis/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  flag = true;
  user: any;
  reset = true;
  passwordNotMatched = false;
  emailNotExists = false;

  credentials = true;

  baseUrl = 'http://localhost:3000/users';

  constructor(public srv: UsersService, private router: Router) {}

  get password() {
    return this.validation.controls['password'];
  }

  get newPassword() {
    return this.validation.controls['newPassword'];
  }

  get email() {
    return this.validation.controls['email'];
  }

  get fname() {
    return this.validation.controls['fname'];
  }

  get lname() {
    return this.validation.controls['lname'];
  }

  validation = new FormGroup({
    email: new FormControl(localStorage.getItem('email'), [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]+@[a-z]+.[a-z]{2,3}'),
    ]),
    password: new FormControl(localStorage.getItem('password'), [
      Validators.required,
      Validators.minLength(6),
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    resetNewPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    fname: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.pattern('^[a-zA-z]+$'),
    ]),
    lname: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.pattern('^[a-zA-z]+$'),
    ]),
  });

  login() {
    this.flag = true;
  }

  signup() {
    this.flag = false;
  }

  //! async and await doesn't work

  clearAlert() {
    this.credentials = true;
  }
  validate() {
    let userEmail = this.validation.value['email'];
    let userPassword = this.validation.value['password'];
    if (userEmail == 'admin@gmail.com' && userPassword == 'Admin@123') {
      this.router.navigate(['/landing']);
      return;
    }

    this.srv.GetUserByEmail(userEmail).subscribe({
      next: (data) => {
        this.user = data;
        this.user = this.user[0];
        if (!(this.user && this.user.password == userPassword)) {
          console.log('InValid Credentials');
          this.credentials = false;
        } else {
          console.log('Login successfully 👌🏼');
          this.router.navigate([`/Profile/Album/${this.user.id}`]);
          localStorage.setItem('email', this.user.email);
          localStorage.setItem('password', this.user.password);
          this.credentials = true;
        }
      },
      error: (err) => {
        this.user = null;
        console.log(err);
      },
    });
  }

  createAccount() {
    let userEmail = this.validation.value['email'];

    this.srv.GetUserByEmail(userEmail).subscribe({
      next: (data) => {
        this.user = data;
        this.user = this.user[0];

        if (!this.user) {
          if (this.email.valid && this.password.valid && this.fname.valid && this.lname.valid) {
            let user = {
              name:
                this.validation.controls['fname'].value +
                ' ' +
                this.validation.controls['lname'].value,
              username: this.validation.controls['fname'].value,
              email: this.validation.controls['email'].value,
              password: this.validation.controls['password'].value,
            };
            this.srv.AddUser(user).subscribe();
            console.log('Successfully');
            this.flag = true;
          } else {
            console.log('Invalid data!');
          }
        } else {
          console.log('This Email is Already Exist !!');
          this.flag = false;
        }
      },
      error: (err) => {
        this.user = null;
        console.log(err);
      },
    });
  }

  showReset() {
    this.reset = false;
  }
  resetPassword() {
    let userEmail = this.validation.value['email'];
    let userPassword = this.validation.value['newPassword'];
    let newPassword = this.validation.value['resetNewPassword'];

    this.srv.GetUserByEmail(userEmail).subscribe({
      next: (data) => {
        this.user = data;
        this.user = this.user[0];
        if (this.user) {
          if (userPassword == newPassword) {
            this.user.password = userPassword;
            this.srv.UpdateUser(this.user.id, this.user).subscribe();
            console.log('password matched ✔');
            localStorage.setItem('email', this.user.email);
            localStorage.setItem('password', this.user.password);
            this.reset = true;
            this.passwordNotMatched = false;
          } else {
            console.log('password Not matched ❌');
            this.passwordNotMatched = true;
          }
          this.emailNotExists = false;
        } else {
          console.log('User Not Found !');
          this.emailNotExists = true;
        }
      },
      error: (err) => {
        this.user = null;
        console.log(err);
      },
    });
  }
}

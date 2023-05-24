import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Servecis/users.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  flag = true;
  users: any;

  baseUrl = 'http://localhost:3000/users'

  constructor(public loginService: UsersService) {}
  ngOnInit() {
    this.loginService.GetAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get password() {
    return (
      this.validation.controls['password']
    );
  }

  get email() {
    return (
      this.validation.controls['email'] 
    );
  }

  get fname() {
    return (
      this.validation.controls['fname'] 
    );
  }

  get lname() {
    return (
      this.validation.controls['lname'] 
    );
  }

  validation = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
    ]),
    password: new FormControl(null, [
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

  validate() {
    let userEmail = this.validation.value['email'];
    let userPassword = this.validation.value['password'];
    let message = '';
    let value;

    for (let i = 0; i < this.users.length; i++) {
      if (
        this.users[i].email == userEmail &&
        this.users[i].password == userPassword
      ) {
        console.log(this.users[i]);
        value = this.users[i];
      } else {
        message = 'Invalid credentials';
      }
    }
    if (value == null) {
      console.log(message);
    }
  }

  createAccount() {
    let userEmail = this.validation.value['email'];
    let notFound = false;

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email == userEmail) {
        console.log('this account already use!');
        notFound = true;
      }
    }

    if (!notFound) {
      if(this.validation.valid){
        let user = {
          name: this.validation.controls['fname'].value+' '+this.validation.controls['lname'].value,
          username: this.validation.controls["fname"].value,
          email: this.validation.controls['email'].value,
          password: this.validation.controls['password'].value,
        };
        this.loginService.AddUser(user).subscribe();
        console.log('Successfully');
      } else{
        console.log('Invalid data!');
      }
    }
  }
}

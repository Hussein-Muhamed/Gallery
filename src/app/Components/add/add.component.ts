import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Servecis/users.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  constructor(private router: Router, public UserService: UsersService) {}
  myValidation = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\d{11})/),
    ]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    streetNumber: new FormControl('', [Validators.required]),
  });
  get Name() {
    return this.myValidation.controls['name'];
  }
  get Email() {
    return this.myValidation.controls['email'];
  }
  get Phone() {
    return this.myValidation.controls['phone'];
  }
  get City() {
    return this.myValidation.controls['city'];
  }
  get Street() {
    return this.myValidation.controls['street'];
  }
  get Street_Num() {
    return this.myValidation.controls['streetNumber'];
  }
  get Address() {
    return (
      (this.City.invalid && (this.City.dirty || this.City.touched)) ||
      (this.Street.invalid && (this.Street.dirty || this.Street.touched)) ||
      (this.Street.invalid && (this.Street.dirty || this.Street.touched))
    );
  }

  Add() {
    if (
      this.Name.valid &&
      this.Email.valid &&
      this.Phone.valid &&
      this.City.valid &&
      this.Street.valid &&
      this.Street_Num.valid
    ) {
      let address = {
        city: this.City.value,
        street: this.Street.value,
        streetNumber: this.Street_Num.value,
      };
      let newUser = {
        name: this.Name.value,
        email: this.Email.value,
        phone: this.Phone.value,
        address,
      };


      this.UserService.AddUser(newUser).subscribe();
      // this.router.navigate(['/users']);
    }
  }
}

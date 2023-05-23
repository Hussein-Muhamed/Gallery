import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  flag = true

  get password(){
    return this.validation.controls['password']
  }

  get email(){
    return this.validation.controls['email']
  }

  validation = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)])
  })

  login(){
    this.flag = true
  }

  signup(){
    this.flag = false
  }
}

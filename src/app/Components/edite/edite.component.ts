import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/Servecis/users.service';

@Component({
  selector: 'app-edite',
  templateUrl: './edite.component.html',
  styleUrls: ['./edite.component.css']
})

export class EditeComponent {
  ID:any;
  User:any;
  
  constructor(private router: Router,myRoute:ActivatedRoute,public UsersService:UsersService){
     this.ID = myRoute.snapshot.params["id"];
     console.log(this.ID);
  }
   x :any ;
  ngOnInit(): void {
    console.log("hi here");
    this.UsersService.GetUserByID(this.ID).subscribe({
      next:(data)=>{
        this.User=data;
        this.myValidation.get('name')?.setValue(this.User.name);
        this.myValidation.get('email')?.setValue(this.User.email);
        this.myValidation.get('phone')?.setValue(this.User.phone);
        this.myValidation.get('city')?.setValue(this.User.address.city);
        this.myValidation.get('street')?.setValue(this.User.address.street);
        this.myValidation.get('streetNumber')?.setValue(this.User.address.suite);
      },
      error:(err)=>{console.log(err)}
    });

  }

  myValidation = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i)]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([a-zA-Z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),
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

  Update() {
    console.log("heloooooo" , this.ID);
    console.log( this.Name.valid ,
      this.Email.valid ,
      this.Phone.valid ,
      this.City.valid ,
      this.Street.valid ,
      this.Street_Num.valid);
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
        suite: this.Street_Num.value,
      };
      let newUser = {
        name: this.Name.value,
        email: this.Email.value,
        phone: this.Phone.value,
        address,
      };

      this.UsersService.UpdateUser(this.ID,newUser).subscribe();
      this.router.navigate(['/landing']);
     
         console.log("ddddddddddddddddddddddddddddddddddddddddd" , this.ID);
    }
  
  }
}

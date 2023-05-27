import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  PatternValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Servecis/users.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  @Output() myevent = new EventEmitter();

  @ViewChild('myname')
  public addModelElem!: ElementRef;


  constructor(private router: Router, public UserService: UsersService) {
    this.myValidation.controls['name'].setValue('');
  }
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.addModelElem.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.myValidation.reset();
    });
  }
  myValidation = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_ ]{2,25}$/i),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^([a-zA-Z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
      ),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^01[0-2,5]{1}[0-9]{8}$'),
    ]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    streetNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[1-9]*$'),
    ]),
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

  validate() {
    if (
      this.Name.valid &&
      this.Email.valid &&
      this.Phone.valid &&
      this.City.valid &&
      this.Street.valid &&
      this.Street_Num.valid
    ) {
      return true;
    } else {
      return false;
    }
  }

  Add() {
    let alert: any = document.getElementById('alert');

    alert.style.display = 'block';

    setTimeout(() => {
      alert.style.display = 'none';
    }, 3000);

    if (this.validate()) {
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
        password:"123456"
      };
      this.UserService.AddUser(newUser).subscribe({next:()=>{  this.myevent.emit(newUser);}}); // this.router.navigate(['/users']);
    
      this.myValidation.reset();
    }
  }
}

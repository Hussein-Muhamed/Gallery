import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Servecis/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  User: any;
  email: any;

  constructor(public srv: UsersService, public router: Router) {}

  validation = new FormGroup({
    email: new FormControl('null', [
      Validators.required,
      Validators.pattern(
        /^([a-zA-Z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
      ),
    ]),
  });

  search() {
    this.srv.GetUserByEmail(this.email).subscribe({
      next: (data) => {
        this.User = data;
        this.User = this.User[0];
        console.log(this.User);
        this.router.navigate([`/Profile/Album/${this.User.id}`]);
     
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  navigate() {
    //! if admin -> landing
    //! if user -> Home
  }

  logo(){
    //! if admin -> landing
    //! if user -> Home
  }
}

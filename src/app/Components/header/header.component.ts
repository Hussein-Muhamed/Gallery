import { Component, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servecis/auth.service';
import { FilterService } from 'src/app/Servecis/filter.service';
import { UsersService } from 'src/app/Servecis/users.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  User: any;
  email: any;
  searchValue:any;
 
 
  constructor(public srv: UsersService, public router: Router , private authSrv:AuthService , private filterSrv:FilterService) {}

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
        this.router.navigate([`/Profile/Album/${this.User.id}`]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  navigate() {
    if (this.authSrv.admin) this.router.navigate([`/landing`]);
    else {
      this.router.navigate([`/Profile/Album/${this.authSrv.UserId}`]);
    }
  }

  logo() {
    if (this.authSrv.admin) this.router.navigate([`/landing`]);
    else {
      this.router.navigate([`/Profile/Album/${this.authSrv.UserId}`]);
    }
  }
  onKey(x:any)
  {
    this.filterSrv.setSearchWord( x.target.value);
  }
}

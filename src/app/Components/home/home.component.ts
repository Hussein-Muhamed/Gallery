import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userType: any;
  admin :any;
  constructor(active: ActivatedRoute , private router: Router) {
    this.userType = active.snapshot.params['id'];
    if (this.userType == 0) this.admin = true;
    else this.admin = false;
  }
}

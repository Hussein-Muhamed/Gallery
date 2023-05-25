import { Component } from '@angular/core';
import { UsersService } from 'src/app/Servecis/users.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  constructor(public UserService: UsersService) {}
  Users: any;
  ngOnInit(): void {
    this.UserService.GetAllUsers().subscribe({
      next: (data) => {
        this.Users = data;
        console.log(this.Users);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
 
}

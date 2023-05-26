import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/Servecis/users.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  id:any
  constructor(public UserService: UsersService,public route:ActivatedRoute, public router:Router) {}
  
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
    this.router.navigate(['/landing'])

  }

  remove(){
    this.id = this.route.snapshot.firstChild?.params['id'] 
    this.UserService.DeleteUser(this.id).subscribe()
    document.location.reload()
  }

}

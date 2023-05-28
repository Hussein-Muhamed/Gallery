import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/Servecis/users.service';
import { EditeComponent } from '../edite/edite.component';
import { RemoveComponent } from '../remove/remove.component';
import { LocationStrategy } from '@angular/common';
import { FilterUsersPipe } from 'src/app/Pipes/filter-users.pipe';
import { FilterService } from 'src/app/Servecis/filter.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  id: any;
  constructor(
    public UserService: UsersService,
    public route: ActivatedRoute,
    public router: Router,
    private location: LocationStrategy , private userFilterSrv:FilterService
  ) {}

  Users: any;

  ngOnInit(): void {
    this.UserService.GetAllUsers().subscribe({
      next: (data) => {
        this.Users = data;
        //this.Users  = this.Users.filter((x:any)=> x.name.startsWith(this.userFilterSrv.searchWord.toLowerCase()) || x.name.startsWith(this.userFilterSrv.searchWord.toUpperCase()) ) ;
        console.log(this.Users);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.router.navigate(['/landing']);
  }
  remove() {
    this.id = this.route.snapshot.firstChild?.params['id'];
    this.UserService.DeleteUser(this.id).subscribe();
    document.location.reload();
  }
  addnewUser(eve: any) {
    this.router.navigate(['/landing']);
    this.ngOnInit();
    console.log(this.Users);
  }
  EditUser(eve: any) {
    if (eve instanceof EditeComponent || eve instanceof RemoveComponent) {
      this.router.navigate(['/landing']);
      this.ngOnInit();
      console.log(this.Users);
    }
  }
}

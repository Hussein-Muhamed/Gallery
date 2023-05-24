import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/Servecis/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  admin = true
  user:any
  id = 2

  constructor(public userService:UsersService, public router:ActivatedRoute){
    // this.id = router.snapshot.params['id']
  }

  ngOnInit() :void{
    this.userService.GetUserByID(this.id).subscribe({
      next:(data)=>{this.user = data;},
      error:(err)=>{console.log(err);}
    })
  }
}

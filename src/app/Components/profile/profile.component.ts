import { Component,Input,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/Servecis/users.service';
import { LocationStrategy } from '@angular/common';
import { PhotosComponent } from '../photos/photos.component';
import { AlbumsComponent } from '../albums/albums.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any
  id :any

  constructor(public userService:UsersService, public router:ActivatedRoute ,  private location: LocationStrategy){
    this.id =  this.router.snapshot.firstChild?.params['id'] ;
  }

  ngOnInit() :void{
    this.userService.GetUserByID(this.id).subscribe({
      next:(data)=>{this.user = data;},
      error:(err)=>{console.log(err);}
    })
  }
  onOutletLoaded(component:any) {
   console.log(component);
    component.id = this.id;
} 
}

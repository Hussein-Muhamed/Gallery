import { Component } from '@angular/core';
import { UsersService } from '../../Servecis/users.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent {
  id:any
constructor(public userService:UsersService, public route:ActivatedRoute, public router:Router){
}
remove(){
  this.id = this.route.snapshot.params['id']
  this.userService.DeleteUser(this.id).subscribe()
  document.location.reload()
}
}

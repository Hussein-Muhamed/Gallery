import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private Base_URL = "http://localhost:3000/users";
  constructor(private myClient:HttpClient) { }
  GetAllUsers(){
    return this.myClient.get(this.Base_URL);
  }
  GetUserByID(id:any){
    return this.myClient.get(this.Base_URL+"/"+id);
  }

  GetUserByEmail(email:any){
    return this.myClient.get(`${this.Base_URL}?email=${email}`)
  }

  AddUser(NewUser:any){
    return this.myClient.post(this.Base_URL,NewUser);
  }
  UpdateUser(id:any, NewUser:any){
    return this.myClient.patch(this.Base_URL+"/"+id, NewUser);
  }
  DeleteUser(id:any){
    return this.myClient.delete(this.Base_URL+"/"+id);
  }
}

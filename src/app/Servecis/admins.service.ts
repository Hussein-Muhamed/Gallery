import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  private readonly baseUrlUsers = 'http://localhost:3000/users'

  constructor(private readonly client:HttpClient) { }

  getall(){
    return this.client.get(this.baseUrlUsers)
  } 
  createUser(user:any){
    return this.client.post(this.baseUrlUsers,user)
  }
}

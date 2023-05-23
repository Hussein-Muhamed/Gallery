import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private Base_URL = "http://localhost:3000/albums";
  constructor(private myClient:HttpClient) { }
  GetAllAlbums(){
    return this.myClient.get(this.Base_URL);
  }
}

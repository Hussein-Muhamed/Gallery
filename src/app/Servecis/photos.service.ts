import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private Base_URL = "http://localhost:3000/photos";
  constructor(private myClient:HttpClient) { }
  GetAllAlbums(){
    return this.myClient.get(this.Base_URL);
  }
}

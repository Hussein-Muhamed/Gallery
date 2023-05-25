import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsService } from 'src/app/Servecis/albums.service';
import { PhotosService } from 'src/app/Servecis/photos.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
})
export class AlbumsComponent implements OnInit {
  Albums: any;
 UserId: any ;
  Photos: any;
  constructor(
    private srv: AlbumsService,
    private photoSrv: PhotosService,
    private ActiveRoote: ActivatedRoute ,private router:Router
  ) {
    this.UserId =  this.ActiveRoote.snapshot.params['id'] ; 
  }
  ngOnInit(): void {
    this.srv.GetLbumssByUserId(this.UserId).subscribe({
      next: (data) => {
        this.Albums = data;
        console.log(this.Albums);
      },
      error: (err) => {
        console.log(err);
      },
    });
   
    this.photoSrv.GetAllPhotos().subscribe({
      next: (data) => {
        this.Photos = data;
      },  
      error: (err) => {
        console.log(err);
      },
    });
  }
  getphotos(albumId: any) {
    return Object.values(this.Photos).filter((x: any) => x.albumId == albumId).length;
  }
  navigate(albumId:any)
  {
    this.router.navigate([`/Profile/Photos/${albumId}`])
  }
}

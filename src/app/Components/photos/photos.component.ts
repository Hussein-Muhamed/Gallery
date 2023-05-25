import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from 'src/app/Servecis/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {
  Photos: any;
  albumId: number;
  constructor(private srv: PhotosService, private ActiveRoote: ActivatedRoute) {
     this.albumId = this.ActiveRoote.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.srv.GetPhotosByAlbumId(this.albumId).subscribe({
      next: (data) => {
        this.Photos = data;
        console.log(this.Photos);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

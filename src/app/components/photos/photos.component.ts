import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { IPhoto } from '../../interfaces/photo.interface';
import { PhotoService } from '../../services/photo.service';
import { TagModule } from 'primeng/tag';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [CardModule, TagModule, NgxSpinnerModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
})
export class PhotosComponent implements OnInit {
  isLoading: boolean = true;
  isError: boolean = false;
  photos: IPhoto[] = [];
  constructor(
    private photoService: PhotoService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.spinner.show();
    this.photoService.getPhotos().subscribe({
      next: (photos) => {
        this.isLoading = false;
        this.photos = photos;
      },
      error: (err) => {
        this.isError = true;
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IPhoto } from '../../interfaces/photo.interface';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { PhotoService } from '../../services/photo.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  retry,
  startWith,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { Message } from 'primeng/api/message';
import { MessageService } from 'primeng/api';
import { DemoComponent } from '../demo/demo.component';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    CardModule,
    TagModule,
    CommonModule,
    NgxSpinnerModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessagesModule,
  ],
  providers: [MessageService],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
})
export class PhotosComponent implements OnInit {
  isLoading: boolean = true;
  isError: boolean = false;
  photos: IPhoto[] = [];
  messages!: Message[];
  filteredPhotos$: Observable<IPhoto[]> | undefined = of([]);
  formGroup!: FormGroup;

  constructor(
    private photoService: PhotoService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.formGroup = new FormGroup({
      text: new FormControl<string | null>(null),
    });

    this.photoService
      .getPhotos()
      .pipe(retry(2))
      .subscribe({
        next: (photos) => {
          this.photos = photos;
          this.isLoading = false;
        },
        error: (err) => {
          this.isError = true;
          this.isLoading = false;
          console.log(err);
        },
      });

    this.filteredPhotos$ = this.formGroup.get('text')?.valueChanges.pipe(
      startWith(''), // Start with an empty string to show all photos initially
      debounceTime(300), // Wait for the user to stop typing
      distinctUntilChanged(),
      map((searchTerm: string) => this.filterPhotos(searchTerm))
    );

    this.filteredPhotos$?.subscribe((photos) => {
      if (photos.length <= 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No photos found...',
        });
      } else {
        this.messageService.clear();
      }
    });
  }

  filterPhotos(searchTerm: string): IPhoto[] {
    if (!searchTerm) {
      // If search term is empty, return all photos
      return this.photos;
    }

    return this.photos.filter((photo) =>
      photo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

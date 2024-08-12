import { Injectable } from '@angular/core';
import { IPhoto } from '../interfaces/photo.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  getPhotos() {
    return this.http.get<IPhoto[]>(
      'https://jsonplaceholder.typicode.com/photos'
    );
  }
}

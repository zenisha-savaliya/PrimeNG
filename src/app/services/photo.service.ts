import { Injectable } from '@angular/core';
import { IPhoto } from '../interfaces/photo.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  getPhotos(): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>(
      'https://jsonplaceholder.typicode.com/photos'
    );
  }

  print(val: any, containerId: string): void {
    let el = document.createElement('li');
    el.innerText = val;
    document.getElementById(containerId)?.appendChild(el);
  }
}

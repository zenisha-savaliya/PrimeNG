import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PhotosComponent } from './components/photos/photos.component';
import { RippleModule } from 'primeng/ripple';
import { DemoComponent } from './components/demo/demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PhotosComponent,
    NgxSpinnerModule,
    TagModule,
    ButtonModule,
    RippleModule,
    DemoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isLoaded: boolean = true;
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  loadPhotos() {
    this.isLoaded = false;
  }

  title = 'photo-gallery';
}

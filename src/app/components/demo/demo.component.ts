import { Component, OnInit } from '@angular/core';
import {
  concatAll,
  concatMap,
  concatWith,
  delay,
  from,
  map,
  mergeAll,
  mergeMap,
  Observable,
  of,
  Subscription,
  switchAll,
  switchMap,
} from 'rxjs';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
})
export class DemoComponent implements OnInit {
  first$ = of('First Observable');
  second$ = of('Second Observable');
  third$ = of('Third Observable');
  subscription!: Subscription;
  constructor(private photoService: PhotoService) {}

  getNames(data: string): Observable<string> {
    return of('Your name is : ' + data).pipe(delay(500));
  }

  ngOnInit(): void {
    const names = from(['Zenisha', 'Parangi', 'Krutika']);

    names
      .pipe(map((data) => this.getNames(data)))
      .subscribe((res) => this.photoService.print(res, 'elContainer'));

    names
      .pipe(
        map((data) => this.getNames(data)),
        concatAll()
      )
      .subscribe((res) => this.photoService.print(res, 'elContainerTwo'));

    names
      .pipe(concatMap((data) => this.getNames(data)))
      .subscribe((res) => this.photoService.print(res, 'elContainerThree'));

    names
      .pipe(map((data) => this.getNames(data)))
      .subscribe((res) => this.photoService.print(res, 'elContainerFour'));

    names
      .pipe(
        map((data) => this.getNames(data)),
        mergeAll()
      )
      .subscribe((res) => this.photoService.print(res, 'elContainerFive'));

    names
      .pipe(mergeMap((data) => this.getNames(data)))
      .subscribe((res) => this.photoService.print(res, 'elContainerSix'));

    names
      .pipe(map((data) => this.getNames(data)))
      .subscribe((res) => this.photoService.print(res, 'elContainerSeven'));

    names
      .pipe(
        map((data) => this.getNames(data)),
        switchAll()
      )
      .subscribe((res) => this.photoService.print(res, 'elContainerEight'));

    names
      .pipe(switchMap((data) => this.getNames(data)))
      .subscribe((res) => this.photoService.print(res, 'elContainerNine'));

    const result$ = this.first$.pipe(concatWith(this.second$, this.third$));

    result$.subscribe((val) => console.log(val));
  }
}
// const broadcastVideos = interval(1000);
// this.subscription = broadcastVideos
//   .pipe(map((res) => 'Video ' + res))
//   .subscribe((res) => {
//     console.log(res);
//   });
// setTimeout(() => {
//   this.subscription.unsubscribe();
// }, 10000);

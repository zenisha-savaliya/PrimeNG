import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'learning-prime-ng';
  public suggestions: string[] = [];
  public countries: string[] = [
    'Australia',
    'Brazil',
    'Canada',
    'Denmark',
    'Egypt',
    'France',
    'Germany',
    'India',
    'Japan',
    'Kenya',
  ];

  public search(event: any): void {
    this.suggestions = this.countries.filter((country) =>
      country.toLowerCase().includes(event.query.toLowerCase())
    );
  }
}

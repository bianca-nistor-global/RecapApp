import { Component, OnInit } from '@angular/core';
import { Places } from '../../interface/zelda.model';
import { HttpClient } from '@angular/common/http';
import { ApiLoader } from '../../services/api-loader';

@Component({
  selector: 'app-places',
  standalone: false,
  templateUrl: './places.html',
  styleUrl: './places.scss'
})
export class PlacesComponent implements OnInit{
  places : Places[]=[];
  constructor(
    private http: HttpClient,
    private apiLoader: ApiLoader){}

  ngOnInit() {
    console.log('ApiLoader:', this.apiLoader);

    this.http
      .get<any>('https://zelda.fanapis.com/api/places')
      .subscribe((response) => {
        this.places = response.data;
        this.places.forEach((place) => {
          this.apiLoader.loadFromUrl(place.appearances).subscribe((games) => {
            place.appearanceGames = games.map((g) => g.data);
          });
          this.apiLoader.loadFromUrl(place.inhabitants).subscribe((inhibitant) => {
            place.inhabitList = inhibitant.map((g) => g.data);
          });
        });
      });
  }
}

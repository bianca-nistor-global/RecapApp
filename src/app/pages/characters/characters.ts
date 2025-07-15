import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiLoader } from '../../services/api-loader';
import { Char } from '../../interface/zelda.model';

@Component({
  selector: 'app-characters',
  standalone: false,
  templateUrl: './characters.html',
  styleUrl: './characters.scss'
})
export class Characters implements OnInit {
  characters : Char[]=[];

  constructor(
    private http: HttpClient,
    private apiLoader: ApiLoader){}

  ngOnInit() {
    console.log('ApiLoader:', this.apiLoader);

    this.http
      .get<any>('https://zelda.fanapis.com/api/characters')
      .subscribe((response) => {
        this.characters = response.data;
        this.characters.forEach((character) => {
          this.apiLoader.loadFromUrl(character.appearances).subscribe((games) => {
            character.appearanceGames = games.map((g) => g.data);
            console.log(character.appearanceGames)
          });
          
        });
      });
  }
}

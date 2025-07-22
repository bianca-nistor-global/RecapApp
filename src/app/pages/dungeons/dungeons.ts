import { Component, OnInit } from '@angular/core';
import {DUNGEONS} from '../../../../public/dungeons'
import { Dungeons } from '../../interface/zelda.model';
import { HttpClient } from '@angular/common/http';
import { ApiLoader } from '../../services/api-loader';

@Component({
  selector: 'app-dungeons',
  standalone: false,
  templateUrl: './dungeons.html',
  styleUrl: './dungeons.scss'
})
export class DungeonsComponent implements OnInit{
  dungeons : Dungeons[]=[];
  constructor(
    private http: HttpClient,
    private apiLoader: ApiLoader){}

  ngOnInit() {
    console.log('ApiLoader:', this.apiLoader);

    this.http
      .get<any>('/zelda-api/api/dungeons')
      .subscribe((response) => {
        this.dungeons = response.data;
        this.dungeons.forEach((dungeon) => {
          this.apiLoader.loadFromUrl(dungeon.appearances).subscribe((games) => {
            dungeon.appearanceGames = games.map((g) => g.data);
            console.log(dungeon.appearanceGames)
          });
          
        });
      });
  }
}

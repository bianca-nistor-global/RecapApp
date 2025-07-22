import { Component, OnInit } from '@angular/core';
import {MONSTERS} from '../../../../public/monsters'
import { Entry } from '../../interface/entry.model';
import { HttpClient } from '@angular/common/http';
import { ApiLoader } from '../../services/api-loader';
import { Monsters } from '../../interface/zelda.model';

@Component({
  selector: 'app-monsters',
  standalone: false,
  templateUrl: './monsters.html',
  styleUrl: './monsters.scss'
})
export class MonsterComponent implements OnInit{
  monsters : Monsters[]=[];
  constructor(
    private http: HttpClient,
    private apiLoader: ApiLoader){}

  ngOnInit() {
    console.log('ApiLoader:', this.apiLoader);

    this.http
      .get<any>('/zelda-api/api/monsters')
      .subscribe((response) => {
        this.monsters = response.data;
        this.monsters.forEach((monster) => {
          this.apiLoader.loadFromUrl(monster.appearances).subscribe((games) => {
            monster.appearanceGames = games.map((g) => g.data);
            console.log(monster.appearanceGames)
          });
          
        });
      });
  }

}

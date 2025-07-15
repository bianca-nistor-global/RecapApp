import { Component, OnInit } from '@angular/core';
import { Entry } from '../../interface/entry.model';
import { ITEMS } from '../../../../public/items';
import { HttpClient } from '@angular/common/http';
import { ApiLoader } from '../../services/api-loader';
import { Items } from '../../interface/zelda.model';

@Component({
  selector: 'app-items',
  standalone: false,
  templateUrl: './items.html',
  styleUrl: './items.scss'
})
export class ItemsComponent implements OnInit {
  items : Items[]=[];
  constructor(
    private http: HttpClient,
    private apiLoader: ApiLoader){}

  ngOnInit() {
    console.log('ApiLoader:', this.apiLoader);

    this.http
      .get<any>('https://zelda.fanapis.com/api/items')
      .subscribe((response) => {
        this.items = response.data;
        this.items.forEach((item) => {
          this.apiLoader.loadFromUrl(item.appearances).subscribe((games) => {
            item.appearanceGames = games.map((g) => g.data);
            console.log(item.appearanceGames)
          });
          
        });
      });
  }


}

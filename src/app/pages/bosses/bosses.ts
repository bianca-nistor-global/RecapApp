import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiLoader } from '../../services/api-loader';
import { Bosses } from '../../interface/zelda.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bosses',
  templateUrl: './bosses.html',
  standalone: false,
  styleUrl: './bosses.scss',
})
export class BossesComponent implements OnInit {
  bosses: Bosses[] = [];
  private destroy$ = new Subject<void>();


  constructor(private http: HttpClient, private apiLoader: ApiLoader) {}
  ngOnInit() {
    //TO DO: UNSUBSCRIBEEE!!!
    //FA METODA
    this.loadBosses();
    //switch map ca in caz ca pica un call sa returnezi o eroare, next, error, complete
  }
  loadBosses() {
    this.http
      .get<{ data: Bosses[] }>('https://zelda.fanapis.com/api/bosses')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.bosses = response.data;

        this.bosses.forEach((boss) => {
          this.apiLoader
            .loadFromUrl(boss.appearances)
            .pipe(takeUntil(this.destroy$))
            .subscribe((games) => {
              boss.appearanceGames = games.map((g) => g.data);
            });

          this.apiLoader
            .loadFromUrl(boss.dungeons)
            .pipe(takeUntil(this.destroy$))
            .subscribe((dungeons) => {
              boss.dungeonList = dungeons.map((d) => d.data);
            });
        });
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

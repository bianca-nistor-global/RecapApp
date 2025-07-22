import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiLoader } from '../../services/api-loader';
import { Bosses } from '../../interface/zelda.model';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-boss-details',
  templateUrl: './boss-details.html',
  styleUrls: ['./boss-details.scss'],
  standalone:false,
})
export class BossDetails implements OnInit, OnDestroy {
  boss!: Bosses;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private apiLoader: ApiLoader
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          return this.http.get<{ data: Bosses }>(`https://zeldaapp.free.beeceptor.com/boss-details/5f6e93a7cbf4202fbde224fd`);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          this.boss = res.data;

          this.apiLoader
            .loadFromUrl(this.boss.appearances)
            .pipe(takeUntil(this.destroy$))
            .subscribe((games) => {
              this.boss.appearanceGames = games.map((g) => g.data);
            });

          this.apiLoader
            .loadFromUrl(this.boss.dungeons)
            .pipe(takeUntil(this.destroy$))
            .subscribe((dungeons) => {
              this.boss.dungeonList = dungeons.map((d) => d.data);
            });
        },
        error: () => {
          console.error('Failed to fetch boss details.');
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

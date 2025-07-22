import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiLoader } from '../../services/api-loader';
import { Bosses } from '../../interface/zelda.model';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bosses',
  templateUrl: './bosses.html',
  standalone: false,
  styleUrl: './bosses.scss',
})
export class BossesComponent implements OnInit {
  bosses: Bosses[] = [];
  private destroy$ = new Subject<void>();


  constructor(private http: HttpClient, private apiLoader: ApiLoader,
    private router: Router) {}
  ngOnInit() {
    //TO DO: UNSUBSCRIBEEE!!!
    //FA METODA
    this.loadBosses();
    //switch map ca in caz ca pica un call sa returnezi o eroare, next, error, complete
  }
  goToBossDetails(id: number) {
    this.router.navigate(['/boss-details', id]);
  }
  loadBosses() {
    this.http
      .get<{ data: Bosses[] }>('https://zeldaapp.free.beeceptor.com/bosses')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.bosses = response.data;
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

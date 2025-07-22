import { Component, ViewChild, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Spinner } from './services/spinner';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.scss',
})
export class App implements OnInit {
  selectedComponent: string = 'home';
  isLoading!: Observable<boolean>;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private loader: Spinner,
    private cdr: ChangeDetectorRef,
    private router: Router 
  ) {}

  ngOnInit() {
    this.isLoading = this.loader.loading$;
    setTimeout(() => this.cdr.detectChanges(), 0);
  }

  setComponent() {
    this.router.navigate([this.selectedComponent]);
  }
}

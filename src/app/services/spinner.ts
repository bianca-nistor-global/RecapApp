import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Spinner {
  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();

  private requests = 0;

  show() {
    this.requests++;
    if (this.requests === 1) {
      this._loading.next(true);
    }
  }

  hide() {
    if (this.requests > 0) {
      this.requests--;
    }
    if (this.requests === 0) {
      this._loading.next(false);
    }
  }

  reset() {
    this.requests = 0;
    this._loading.next(false);
  }
}

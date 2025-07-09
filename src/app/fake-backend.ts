import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { delay, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class FakeBackend {
  private usedEmails = ['bia@global.com', 'admin@admin.com'];
  checkEmailNotTaken(email: string) {
    return of(this.usedEmails.includes(email)).pipe(
      delay(1000),
      map((exists) => (exists ? { emailTaken: true } : null))
    );
  }
  constructor() {}
}

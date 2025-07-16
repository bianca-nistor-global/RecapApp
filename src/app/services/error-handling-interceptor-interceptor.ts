import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An unexpected error occurred.';

      if (error.status === 0) {
        message = 'Network error – please check your connection.';
      } else if (error.status >= 500) {
        message = 'Server error – please try again later.';
      } else if (error.status >= 400) {
        message = error.error?.message || 'Something went wrong.';
      }

      snackBar.open(message, 'Close', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['mat-warn'], 
      });

      return throwError(() => error);
    })
  );
};

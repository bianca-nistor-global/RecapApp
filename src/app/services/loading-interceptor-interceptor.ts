import { HttpInterceptorFn } from '@angular/common/http';
import { Spinner } from './spinner';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { SKIP_LOADER } from './skip-loader.token';

export const loadingInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(Spinner);
  const skipLoader = req.context.get(SKIP_LOADER);
  if (!skipLoader) {
    loader.show();
  }
  return next(req).pipe(
    finalize(() => {
      if (!skipLoader) {
        loader.hide();
      }
    })
  );
};

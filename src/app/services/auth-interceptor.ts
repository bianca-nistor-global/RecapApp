import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.local';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenizedRequest= req.clone({
    setHeaders:{
      'Content-Type':'application/json',
      Authorization: `${environment.apiKey}`
    }
  })

  return next(tokenizedRequest);
};

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    let token = localStorage.getItem('JWT_TOKEN');
    if (token) {
     req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(req);
    }
    return next(req);
};

import { HttpInterceptorFn } from "@angular/common/http";

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const localData = localStorage.getItem('loginToken');

  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localData}`
    }
  })

  return next(cloneReq);
}


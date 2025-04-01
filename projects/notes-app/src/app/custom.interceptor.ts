import { HttpInterceptorFn } from "@angular/common/http";

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  
  //const lToken = localStorage.getItem('loginToken');
  //console.log(lToken);
  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${sessionStorage.getItem('loginToken')}`
    }
  })

  return next(cloneReq);
}  
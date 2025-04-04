import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let router = inject(Router);
  const loginToken = localStorage.getItem('loginToken');
  if(loginToken){
    try{
    let decodedToken = jwtDecode(loginToken);
      const isExpired = 
        decodedToken && decodedToken.exp ? decodedToken.exp < Date.now()/1000 : false;

      if(isExpired) {
        console.log('token expired');
        localStorage.removeItem('loginToken');
        router.navigateByUrl('/login');
      }
      else{
        console.log('token not expired');
      }
    }
    catch(e){
        console.log("ERROR: ", e);
        localStorage.removeItem('loginToken');
        router.navigateByUrl('/login');
    }
  }
  else{
    console.log('no token');
    router.navigateByUrl('/login');
  }
  
  return next(req);
};

import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class jwtInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // except for /login endpoint
        if (request.url.includes('/login')) {
            return next.handle(request);
        }
        // edit request
        request = request.clone({
            // bring token from sessionStorage and add as header
            setHeaders: {
                Authorization: `Bearer ${sessionStorage.getItem('loginToken')}`
            }
        });
        return next.handle(request).pipe( tap(() => {},
            (err: any) => {
                // handle response
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return false;
                    }
                    alert('Session expired. Please login again.');
                    sessionStorage.removeItem('loginToken');
                    this.router.navigateByUrl('/login');
                }
        }));
    }

}
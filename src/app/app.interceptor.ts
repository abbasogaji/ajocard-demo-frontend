import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private loginService : LoginService){}
    intercept(req : HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>>{
        const token = localStorage.getItem('access_token')
        if(token){
            const clonedReq = req.clone({
                headers : req.headers.set("Authorization", "Bearer "+token)
            })
            return next.handle(clonedReq).pipe(
                catchError((error: HttpErrorResponse) => {
                    if((error.status == 401)){                          
                        this.loginService.logOut();    
                    }
                    return throwError(error);
                })
              );
        }else{
            return next.handle(req).pipe(
                catchError((error: HttpErrorResponse) => {
                    if((error.status == 401)){                          
                        this.loginService.logOut();    
                    }
                    return throwError(error);
                })
              );
        }
    }
}
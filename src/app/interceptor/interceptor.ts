import {Injectable} from '@angular/core'
import {HttpInterceptor,HttpRequest,HttpHandler,HttpEvent,HttpErrorResponse}
from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(){ }
    intercept(
        request:HttpRequest<any>,
        next:HttpHandler
    ) : Observable<HttpEvent<any>>{
        console.info("INSIDE INTERCEPTOR")
            debugger        
        if (sessionStorage.getItem('aT_') != null) {
            debugger
            const token = sessionStorage.getItem('aT_');
            const AuthRequest = request.clone({
              setHeaders: {
                Authorization: 'Bearer ' + token,
              },
            });
            return next.handle(AuthRequest).pipe(
                catchError((error) => {
                    console.log(error);
                    return this.handleError(AuthRequest, next)
                })
            ) ;
        }
        else{
            const token = sessionStorage.getItem('aT_');
            const AuthRequest = request.clone({
              setHeaders: {},
            });
            return next.handle(AuthRequest).pipe(
                catchError((error) => {
                    console.log(error);
                    return this.handleError(AuthRequest, next)
                })
            )
        }
    }
    handleError(request: HttpRequest<any>, next: HttpHandler) : Observable<any>{
        return throwError(()=>'session expired');
    }

}
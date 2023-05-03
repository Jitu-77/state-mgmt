import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
export interface requestBody{
  username:string,
  password:string
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
    /**
   *  INITIAL AUTH TOKEN WRAPPER
   *  SETS THE TOKEN TO THE STORAGE
   * @returns
   */
    initialAuthWrapper() {
      return new Promise((resolve, reject) => {
        let reqBody = {
          username: 'U2FsdGVkX18jrGBdGbjQy3Ox8Jr5gZEC1kH7jGwWj6uMFFbCcm69p+xgnlVHBQVD',
          password:'U2FsdGVkX1/3kh8Hh7wkZsy5aGdS01rW3C6nWfwuT4brgq46FiB8AU9Rf0zKO5vA'
        };
        return this.http
          .post(environment.apiUrl +'api/'+ 'login', reqBody)
          .toPromise()
          .then(
            (data: any) => {
              console.log(data);
              sessionStorage.setItem('aT_', data.token);
              resolve(true);
            },
            (error) => {
              console.error(error,"from error block");
              // resolve(false);
              reject(true)
            }
          ).catch((error)=>{
            console.error(error,"from error block catch");
            reject(true)
          })
      });
    }
    /******************************************************************************************* */
    // initialAuthWrapperNewFormat(requestBody:requestBody) :Observable<requestBody>{
    //   return this.http.post<requestBody>(environment.apiUrl +'api/'+ 'login',requestBody).pipe(catchError((e)=>{
    //     console.error(e,'FROM SERVICE');
        
    //     return throwError(new Error ('e'))
    //   }))
    // }
   /******************************************************************************************* */
    initialAuthWrapperNewFormat(requestBody:requestBody) :Observable<requestBody>{
      return this.http.post<requestBody>(environment.apiUrl +'api/'+ 'login',requestBody)
    }
   /******************************************************************************************* */
    /**
     * 
     */
   /******************************************************************************************* */    
    get():Observable<any>{
      const token = sessionStorage.getItem('aT_');
      // let params = new HttpParams().append('customer_id' , 'aaxx').append('isComet',false)
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: `Bearer ${token}`,
          
      }),
      // params:params
    }
      //WITHOUT INTERCEPTOR
      // return this.http.get(environment.apiUrl+'api/v4'+'/car-exchange/getCarwaleExchangeCities',httpOptions)
      //WITH INTERCEPTOR
      return this.http.get(environment.apiUrl+'api/v4'+'/car-exchange/getCarwaleExchangeCities')
    }
    /******************************************************************************************* */

    post(requestBody : any):Observable<any>{
      const token =sessionStorage.getItem('aT_')
      const httpOptions = {
        headers: new HttpHeaders({
          'content-type':'Application/json',
          Authorization:`Bearer ${token}`
        })
      }
      //WITHOUT INTERCEPTOR
      // return this.http.post<any>(environment.apiUrl+'api/v4'+'/variants/getAllVariantsById',requestBody,httpOptions)
      // WITH INTERCEPTOR
      return this.http.post<any>(environment.apiUrl+'api/v4'+'/variants/getAllVariantsById',requestBody)
    }

}

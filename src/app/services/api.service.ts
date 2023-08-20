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
   /******************************************************************************************* */    
    postEnq(requestBody : any):Observable<any>{
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
      return this.http.post(environment.apiUrl+'api/v4'+'/enquiry/getEnquiryListing',requestBody)
    }
    /******************************************************************************************* */
   /******************************************************************************************* */    
    addEnq(requestBody : any):Observable<any>{
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
      return this.http.post(environment.apiUrl+'api/v4'+'/enquiry/saveEnquiry',requestBody)
    }
    /******************************************************************************************* */
   /******************************************************************************************* */    
    updateEnq(requestBody : any):Observable<any>{
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
      return this.http.post(environment.apiUrl+'api/v4'+'/enquiry/editEnquiry',requestBody)
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

    getProducts(){
      // const httpOptions = {
      //   headers : new Headers({
      //     'Content-Type' : 'application/json',
      //     Authorization:`Bearer cfa2fc146aadc02a5cadb9d80e4a0f537ab06ac266022af4468d878bd1ff1453eeb5dba59623582c71a72ee77af821b64bf3edb63f40d43bd24f5744e19c2bfc0c0245be2acc9117957861704ed27c64234eaf0cc25c1d7c0a9a15cbbb61dfc1123ad9e52f6cfde75e7ad4543db831f2f2ffa858b022912fb6c617e1af483a6b`
      //   })
      // }
      return this.http.get(environment.strapiApiUrl+'api/products?populate=*')
    }
    addProducts(data:any){
      const httpOptions = {
        headers: new HttpHeaders({
          'content-type':'Application/json',
          // Authorization:`Bearer ${token}`
        })
      }
      //WITHOUT INTERCEPTOR
      // return this.http.post<any>(environment.apiUrl+'api/v4'+'/variants/getAllVariantsById',requestBody,httpOptions)
      // WITH INTERCEPTOR
      return this.http.post<any>(environment.strapiApiUrl+'api/products',data)
    }
    updateProducts(data:any,id:any){
      const httpOptions = {
        headers: new HttpHeaders({
          'content-type':'Application/json',
          // Authorization:`Bearer ${token}`
        })
      }
      //WITHOUT INTERCEPTOR
      // return this.http.post<any>(environment.apiUrl+'api/v4'+'/variants/getAllVariantsById',requestBody,httpOptions)
      // WITH INTERCEPTOR
      return this.http.put<any>(environment.strapiApiUrl+'api/products'+'/'+id,data)
    }
    deleteProducts(id:any){
      const httpOptions = {
        headers: new HttpHeaders({
          'content-type':'Application/json',
          // Authorization:`Bearer ${token}`
        })
      }
      //WITHOUT INTERCEPTOR
      // return this.http.post<any>(environment.apiUrl+'api/v4'+'/variants/getAllVariantsById',requestBody,httpOptions)
      // WITH INTERCEPTOR
      return this.http.delete<any>('api/products'+'/'+id)
    }
}

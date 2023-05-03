import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
export interface requestBody {
  username: string;
  password: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'state-mgmt';
  constructor(private apiService: ApiService) {
    /******************************USING PROMISE BLOCK****************************/
    // this.apiService.initialAuthWrapper().then((data)=>{
    //   console.log(data);
    // })
    /***************************USING PROMISE BLOCK*******************************/
    let reqBody = {
      username:
        'U2FsdGVkX18jrGBdGbjQy3Ox8Jr5gZEC1kH7jGwWj6uMFFbCcm69p+xgnlVHBQVD',
      password:
        'U2FsdGVkX1/3kh8Hh7wkZsy5aGdS01rW3C6nWfwuT4brgq46FiB8AU9Rf0zKO5vA',
    };
    /***************************WORKING BUT DEPRECATED*******************************/
    // this.apiService.initialAuthWrapperNewFormat(reqBody).subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    /**************************WORKING BUT DEPRECATED********************************/
    /*************************** CURRENT *******************************/
    this.apiService.initialAuthWrapperNewFormat(reqBody).subscribe(
      {
      next: (v:any) => {
        console.log(v)
        sessionStorage.setItem('aT_', v?.token);
        this.get()
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    }
    );
    /************************** CURRENT********************************/
    /***************************GET ***********************************/
    // this.apiService.get().subscribe({
    //   next: (v) => console.log(v,'-----'),
    //   error: (e) => console.error(e),
    //   complete: () => console.info('complete') 
    // })
    /***************************GET ***********************************/
  }
  get(){
    this.apiService.get().subscribe({
      next: (v) => {
        console.log(v,'-----')
        this.post()
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  }
  post(){
    let reqBody = {
        variantIds :  ["120", "121"]
    }
    this.apiService.post(reqBody).subscribe(
      {
        next:(res)=>{

      },
      error:(err)=>{

      },
      complete: ()=>{
        console.info('COMPLETED')
      }
    }
    )
  }
}

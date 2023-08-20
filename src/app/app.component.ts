import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router'
export interface requestBody {
  username: string;
  password: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'state-mgmt';
  constructor(private apiService: ApiService,private router :Router) {
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
    // this.apiService.initialAuthWrapperNewFormat(reqBody).subscribe(
    //   {
    //   next: (v:any) => {
    //     console.log(v)
    //     sessionStorage.setItem('aT_', v?.token);
    //     this.get()
    //   },
    //   error: (e) => console.error(e),
    //   complete: () => console.info('complete') 
    // }
    // );
    /************************** CURRENT********************************/
    /***************************GET ***********************************/
    // this.apiService.get().subscribe({
    //   next: (v) => console.log(v,'-----'),
    //   error: (e) => console.error(e),
    //   complete: () => console.info('complete') 
    // })
    /***************************GET ***********************************/
  }
  ngOnInit(){
    // this.getEnquiry()
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
  getEnquiry(){
    const request = {
      dealer_id:"168",
      agent_id:"178",
      page:1,
      fromDate:"2023-04-01",
      toDate:"2023-04-30",
      customer_email:null,
      customer_mobile:null
    }
    this.apiService.postEnq(request).subscribe({
      next: (v) => {
        console.log(v,'-----')
        this.post()
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  }
  addEnquiry(){
    const reqBody = {
      salutation:"Mr.",
      first_name:"QWETY",
      last_name:"",
      country_code:"+91",
      mobile_number:"7894563210",
      email:"qwe@qwe.com",
      model_id:26,
      agent_id:"173",
      dealer_id:"168",
      source:"Walk-in",
      channel:"channel",
      alternate_mobile_number:"",
      location:"Mumbai",
      pincode:"123123",
      type_of_purchase:"First time buyer",
      type_of_buyer:"Individual",
      comments:"",
      customer_id:"1286",
      enquiry_id:"188",
      created_by:"178"
    }
    this.apiService.addEnq(reqBody).subscribe({
      next: (v) => {
        console.log(v,'-----')
        this.post()
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  }
  updateEnq(){
    const reqBody = {
      salutation:"Mr.",
      first_name:"Zczxc",
      last_name:"",
      country_code:"+91",
      mobile_number:"7894563210",
      email:"zxc@asd.com",
      model_id:28,
      agent_id:"173",
      dealer_id:"168",
      source:"Walk-in",
      channel:"channel",
      alternate_mobile_number:"",
      location:"Mumbai",
      pincode:"123123",
      type_of_purchase:"First time buyer",
      type_of_buyer:"Individual",
      comments:"",
      customer_id:"1286",
      enquiry_id:"188",
      updated_by:"178"
    }
    this.apiService.updateEnq(reqBody).subscribe({
      next: (v) => {
        console.log(v,'-----')
        this.post()
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  }
  onRoute(){
    this.router.navigate(['/users'])
  }
}

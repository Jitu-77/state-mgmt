import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { productsGet } from 'src/store/actions/products.action';
import { ProductState } from 'src/store/states/products.state';

@Component({
  selector: 'app-page-a',
  templateUrl: './page-a.component.html',
  styleUrls: ['./page-a.component.scss']
})
export class PageAComponent implements OnInit {
  //Now we will be creating a select method Observable 
  // we can also use this observable oly in html file for rendering
  @Select(ProductState.getProductList) $products? :Observable<any>

  @Select(ProductState.getProductLoadedValue) $productLoaded? :Observable<any>
  productList :any = []
  constructor(private router :Router,private apiService: ApiService,private http: HttpClient,private store :Store ) { }

  async ngOnInit(): Promise<void> {
    this.getProducts()
    // this.$products?.subscribe((data)=>{
    //   console.log("state Slice " , data)
    //   this.productList = data
    // })
  }
  getProducts(){
    /********************************************************** */
    // // this.apiService.getProducts().subscribe((data : any)=>{
    // //   this.productList = data?.data
    // //   console.warn(data)
    // // })
    // this.store.dispatch(new productsGet())
    // //calling the action file by dispatch method 
/********************************************************** */

    //Now with loaded boolean to reduce api call
    this.$productLoaded?.subscribe((res)=>{
      if(!res){
        this.store.dispatch(new productsGet())
      }
    })
  }
  onClick(e?:any){
    this.router.navigate(['/admin'],{queryParams :{id:e?.id}})
  }
  onItemClick(e:any){
    console.warn(e)
    // setting data in ls and retrieving data
    // localStorage.setItem('det',JSON.stringify(e)) 
    // localStorage.setItem('det',e)
    this.onClick(e)
  }
}

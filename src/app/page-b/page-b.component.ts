import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Select,Store } from '@ngxs/store';
import { ProductState } from 'src/store/states/products.state';
import { Observable } from 'rxjs';
import { productsAdd, productsById, productsDelete, productsUpdate } from 'src/store/actions/products.action';
@Component({
  selector: 'app-page-b',
  templateUrl: './page-b.component.html',
  styleUrls: ['./page-b.component.scss']
})
export class PageBComponent implements OnInit {
    //Now we will be creating a select method Observable 
  // we can also use this observable oly in html file for rendering
  @Select(ProductState.getProductById) $selectedProduct? :Observable<any>



  productForm?:FormGroup ;
  type?:any;
  id?:any;
  constructor(public formBuilder: FormBuilder,
    public activatedRouter : ActivatedRoute,
    private router :Router,
    private apiService: ApiService,
    private store :Store) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      category: ['', [Validators.required]],
      availableQty: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
    this.activatedRouter.queryParams.subscribe((data:any)=>{
      if(data){
        if(data?.id){
            this.id = data?.id
            this.type='update'
            //********************Retrieving data from ls***********************************/
            // let dataSrc :any = JSON.parse(localStorage.getItem('det') || '{}')
            // this.productForm?.patchValue({
            //   title : dataSrc?.attributes.title,
            //   slug : dataSrc?.attributes.slug,
            //   category : dataSrc?.attributes.category,
            //   availableQty : dataSrc?.attributes.availableQty,
            //   price : dataSrc?.attributes.price
            // })
            //********************Retrieving data from ls***********************************/
            this.onGetDataFromState(data?.id)
        }else{
          this.type='add'
          console.log("NO DATA")
        }
      }else{
        this.type='add'
        console.log("NO DATA")
      }
    })
  }
  onSubmit(e:any){
    e.stopPropagation()
    console.log(this.productForm);

    if (this.type == 'add'){
      let obj = {
        data:{
          ...this.productForm?.value
        }
      }
      // this.apiService.addProducts(obj).subscribe((data)=>{
      //   console.log(data)
      // })
      this.store.dispatch(new productsAdd(obj))
    }else{
      let obj = {
        data:{
          ...this.productForm?.value
        }
      }
    // this.apiService.updateProducts(obj,this.id).subscribe((data)=>{
    //   console.log(data)
    // })
    this.store.dispatch(new productsUpdate(obj,this.id))
    // this.store.dispatch(new productsUpdate(obj))
    }
  }
  onGoBack(){
    this.router.navigate(['/users'])
    localStorage.removeItem('det')
  }
  onGetDataFromState(id:any){
    this.store.dispatch(new productsById(id))
    this.$selectedProduct?.subscribe((data)=>{
      console.log(data)
    this.productForm?.patchValue({
    title : data?.attributes.title,
    slug : data?.attributes.slug,
    category : data?.attributes.category,
    availableQty : data?.attributes.availableQty,
    price : data?.attributes.price
    })
    })
  }
  onDelete(e:any){
    this.store.dispatch(new productsDelete(this.id))
  }
}

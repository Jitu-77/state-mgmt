import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-page-b',
  templateUrl: './page-b.component.html',
  styleUrls: ['./page-b.component.scss']
})
export class PageBComponent implements OnInit {
  productForm?:FormGroup ;
  type?:any;
  id?:any;
  constructor(public formBuilder: FormBuilder,
    public activatedRouter : ActivatedRoute,
    private router :Router,
    private apiService: ApiService) { }

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
            let dataSrc :any = JSON.parse(localStorage.getItem('det') || '{}')
            this.productForm?.patchValue({
              title : dataSrc?.attributes.title,
              slug : dataSrc?.attributes.slug,
              category : dataSrc?.attributes.category,
              availableQty : dataSrc?.attributes.availableQty,
              price : dataSrc?.attributes.price
            })
            // this.productForm?.patchValue({
            //   title : JSON.parse(dataSrc)?.attributes.title,
            //   slug : JSON.parse(dataSrc)?.attributes.slug,
            //   category : JSON.parse(dataSrc)?.attributes.category,
            //   availableQty : JSON.parse(dataSrc)?.attributes.availableQty,
            //   price : JSON.parse(dataSrc)?.attributes.price
            // })
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
  onSubmit(){
    console.log(this.productForm);
    if (this.type == 'add'){
      let obj = {
        data:{
          ...this.productForm?.value
        }
      }
      this.apiService.addProducts(obj).subscribe((data)=>{
        console.log(data)
      })
    }else{
      let obj = {
        data:{
          ...this.productForm?.value
        }
      }
    this.apiService.updateProducts(obj,this.id).subscribe((data)=>{
      console.log(data)
    })
    }
  }
  onGoBack(){
    this.router.navigate(['/users'])
    localStorage.removeItem('det')
  }
}

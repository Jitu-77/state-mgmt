import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-a',
  templateUrl: './page-a.component.html',
  styleUrls: ['./page-a.component.scss']
})
export class PageAComponent implements OnInit {
  productList :any = []
  constructor(private router :Router,private apiService: ApiService,private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.apiService.getProducts().subscribe((data : any)=>{
      this.productList = data?.data
      console.warn(data)
    })
  }
  onClick(e?:any){
    this.router.navigate(['/admin'],{queryParams :{id:e?.id}})
  }
  onItemClick(e:any){
    console.warn(e)
    localStorage.setItem('det',JSON.stringify(e))
    // localStorage.setItem('det',e)
    this.onClick(e)
  }
}

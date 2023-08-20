import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { productsGet } from "../actions/products.action";
import { ApiService } from "src/app/services/api.service";
import { tap } from "rxjs";
export class ProductStateModel{
    data? : any;
    loaded?:boolean
}

@State<ProductStateModel>({
    name: 'products',
    defaults:{
        data : [],
        loaded : false
    }
  })

  @Injectable()

export class ProductState{
    
    constructor(private apiService: ApiService){}

    @Selector()  // to enable state selection
    static  getProductList(state:any){ // static is a keyword needed to define
        return state.data
    }

    @Selector()  // to enable state selection
    static  getProductLoadedValue(state:any){ // static is a keyword needed to define
        return state.loaded
    }


    @Action(productsGet) // import a particular action
    getProduct({getState,setState}:StateContext<any>){  //getState , setState are methods of state context
    //state context are used to manipulate teh state value
    //Now we will call the api , we wont subscribe the data here as will only modify the data here and pass 
    // we always return methods in service files
    return this.apiService.getProducts().pipe(tap((res:any)=>{
        console.log(res,"RES DATA")
        const state = getState() // getting the initial value of state
        console.log(state)
        setState({
            ...state,
            data: res.data,
            loaded : true
        })

    }))
        console.log("State Action")
    }
}
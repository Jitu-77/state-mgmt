import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { productsAdd, productsById, productsDelete, productsGet } from "../actions/products.action";
import { ApiService } from "src/app/services/api.service";
import { tap } from "rxjs";
export class ProductStateModel{
    data? : any;
    loaded?:boolean;
    selectedProduct?:any
}

@State<ProductStateModel>({
    name: 'products',
    defaults:{
        data : [],
        loaded : false,
        selectedProduct : null
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

    @Selector()  // to enable state selection
    static  getProductById(state:any){ // static is a keyword needed to define
        return state.selectedProduct
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


    @Action(productsById) // import a particular action
    getProductById({getState,setState}:StateContext<any> , {id}:productsById){  
    //id will of the  type i.e productsById which is defined in Actions
    //getState , setState are methods of state context
    //state context are used to manipulate teh state value
    //Now we will call the api , we wont subscribe the data here as will only modify the data here and pass 
    // we always return methods in service files
        console.log("State Action",id)
        const state = getState()
        console.log("State Action",state)
        let emp = state?.data.find((el:any)=>{
            return el?.id == id
        })
        console.log("State Action",emp)
        setState({
            ...state,
            selectedProduct : emp
        })
    }
    //For adding api we don't need a selector , hence will write only action
    @Action(productsAdd)
    AddProduct({getState,patchState}:StateContext<any>,{payload}:productsAdd){
        console.log(payload)
       return this.apiService.addProducts(payload).pipe(tap((res)=>{
            console.log(res)
            const state = getState()
            console.log("State Action",state)
            patchState({
                data : [...state?.data,res?.data]
            })
        }))
    }

    @Action(productsDelete)
    deleteProduct({getState,setState}:StateContext<any>,{id}:productsDelete){
        console.log(id)
       return this.apiService.deleteProducts(id).pipe(tap((res:any)=>{
            console.log(res)
                const state = getState()
                let newState = state?.data.filter((el :any)=>{
                    return res?.data.id !=  el?.id
                })
                console.log("State Action",newState)
                setState({
                    ...state,
                    data:newState
                })
        }))
    }
}
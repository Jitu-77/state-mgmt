export class productsAdd{
    static readonly type  = '[Product] Add';
    constructor(public payload:any){} // argument that is passed as payload
}

export class productsGet{
    static readonly type  = '[Product] Get';
    // constructor(public payload:any){} no argument so no constructor is needed
}

export class productsDelete{
    static readonly type  = '[Product] Delete';
    constructor(public id:any){} 
}

export class productsUpdate{
    static readonly type  = '[Product] Update';
    constructor(public payload:any,public id:any){} 
    // constructor(public id:any){} 
    // constructor(public payload:any){} 
}
export class productsById{
    static readonly type  = '[Product] getIndProduct';
    constructor(public id:any){} 
}
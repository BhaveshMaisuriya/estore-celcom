export class BreadcrumbModel{
    IsFirst?:boolean = false;
    IsLast?:boolean = false;
    constructor(
       public Index:number,
       public Title:string,
       public Api:string,
       public Alias:string,
       public RecordCount:number       
    ){        
        if(Index == 0){
            this.IsFirst = true;
        }
        // if(RecordCount == (Index+1)){
        //     this.IsLast = true;            
        // }        
        
    }
}

export class PageComponentListModel{
    Name:string;
    Widget:any;
    IsInitialized:boolean;
    Data:any;
    constructor(name:string,widget:any,data:any,isInitialzed?:boolean){
        this.Name = name;
        this.Widget = widget;
        this.IsInitialized = isInitialzed;
        this.Data = data;
    }
}
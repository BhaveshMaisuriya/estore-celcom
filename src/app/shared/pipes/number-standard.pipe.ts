import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberStandardFilter',
    pure: false
})
export class NumberStandardFilter implements PipeTransform {
    transform(standardNumber: any): any {
        if (standardNumber != undefined){
            if(standardNumber.toString().startsWith("60")){
                return "0"+standardNumber.toString().substring(2);
            }else{
                return standardNumber;
            }

        }
    }
}

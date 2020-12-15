import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderFilter',
    pure: false
})
export class OrderFilter implements PipeTransform {
    transform(data: any[], filter: string): any {
        if (!data || !filter || filter === 'Filter by Status' || filter === 'All') {
            return data;
        }
        return data.filter(order => order.status === filter);
    }
}

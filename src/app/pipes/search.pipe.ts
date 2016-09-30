import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'search'
})
export class SearchFilterPipe implements PipeTransform {
    transform(value: any, args: string[]): any {
        if(args[0] != null){ 
            let filter = args[0].toLocaleLowerCase();
            if(value != null)
                return filter ? value.filter(feed=> feed.title.toLocaleLowerCase().indexOf(filter) != -1
                                || feed.text.toLocaleLowerCase().indexOf(filter) != -1) : value;
        }
    }
}
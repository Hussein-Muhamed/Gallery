import { Pipe, PipeTransform } from '@angular/core';
import { FilterService } from '../Servecis/filter.service';

@Pipe({
  name: 'filterUsers' , pure: false
})
export class FilterUsersPipe implements PipeTransform {

  constructor(private filterSrv:FilterService)
  {

  }
  transform(list: any[]  ) {
    return  this.filterSrv.searchWord ? list.filter(item => item.name.startsWith(this.filterSrv.searchWord.toLowerCase()) || item.name.startsWith(this.filterSrv.searchWord.toUpperCase()) ) : list;
  }

}

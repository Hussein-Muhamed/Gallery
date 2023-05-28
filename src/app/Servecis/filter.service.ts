import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
searchWord :any ;
  constructor() { 
    this.searchWord = ''; 
  }
  setSearchWord( word:any)
  {
    this.searchWord = word;
  }
}

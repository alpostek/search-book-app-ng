import { Injectable } from '@angular/core';
import { QueryParams } from './query-params';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {

  constructor(private searchService: SearchService) { }

  passParams(params: QueryParams){
    this.searchService.setQuery(params)
  }
  updateSearchIndex(index: number){
    this.searchService.updateIndex(index*10);
  }

}

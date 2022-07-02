import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QueryParams } from '../query-params';
import { QueryParamsService } from '../query-params.service';
//import { SearchService } from '../search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  query: string;
  param: string;

  //@Output() search: EventEmitter<QueryParams> = new EventEmitter<QueryParams>();
  @Output() search: EventEmitter<any> = new EventEmitter();

  constructor(private paramsService: QueryParamsService) { }

  searchBooks(){
    const parameters: QueryParams = {
      query: this.query,
      param: this.param
    }
    this.paramsService.passParams(parameters)
    this.search.emit();
  }

  ngOnInit(): void {
  }

}

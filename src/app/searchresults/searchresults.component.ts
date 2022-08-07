import { Component, Input, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../book';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  books$ = this.searchService.books$.pipe(
    catchError(err => {
      return EMPTY;
    }) 
  );

}

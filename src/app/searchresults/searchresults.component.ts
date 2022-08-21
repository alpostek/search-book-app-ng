import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Book } from '../book';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private searchService: SearchService) { }

  books$ = this.searchService.books$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err)
      return EMPTY;
    })
  );

  noResults$ = this.searchService.noResultsMessage$;
  
  moreBooks$ = this.searchService.areThereMoreBooks$;

  onLoadMore(){
    this.searchService.loadMoreBooks();
  }

}

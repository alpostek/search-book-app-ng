import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../book';
import { QueryParams } from '../query-params';
import { QueryParamsService } from '../query-params.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-searchcontainer',
  templateUrl: './searchcontainer.component.html',
  styleUrls: ['./searchcontainer.component.scss']
})
export class SearchcontainerComponent implements OnInit, OnDestroy {

  books: Book[] = [];
  error: string;
  errorMsg: Subscription;
  noResults: boolean = false;
  getBooks: Subscription;
  booksLoaded: boolean = false;
  counter: number = 0;

  constructor(private searchservice: SearchService, private queryParamsService: QueryParamsService) { }

  handleSearch(event: any){
    this.getBooks = this.searchservice.getBooks()
   .subscribe((items: Book[]) => {
    console.log("search")
      this.books = items;
      this.booksLoaded = true;
      if (!items.length) this.noResults = true;
   })
  }

  handleLoadMore(){
    this.counter++;
    this.queryParamsService.updateSearchIndex(this.counter)
    this.getBooks = this.searchservice.getBooks()
   .subscribe((items: Book[]) => {
    console.log("load more books")
      this.books = items;
      this.booksLoaded = true;
      if (!items.length) this.noResults = true;
      //if (this.booksLoaded && items.length)//
   })
  }


  ngOnInit(): void {
   this.errorMsg = this.searchservice.errorMessage.subscribe(msg => {
      this.error = msg;
    })

  }

  ngOnDestroy(){
    this.getBooks.unsubscribe();
    this.errorMsg.unsubscribe();
  }

}

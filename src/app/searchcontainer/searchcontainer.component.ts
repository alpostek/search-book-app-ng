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
  loadMoreMessageSub: Subscription;
  loadMoreMessage: string;

  constructor(private searchservice: SearchService, private queryParamsService: QueryParamsService) { }

  handleSearch(event: any){
    this.getBooks = this.searchservice.getBooks()
   .subscribe((items: Book[]) => {
      this.books = items;
      this.setLoadingInfo(items)
   })
  }

  handleLoadMore(){
    this.counter++;
    this.queryParamsService.updateSearchIndex(this.counter)
    this.searchservice.getBooks()
   .subscribe((items: Book[]) => {
      this.books = this.books.concat(items);
     this.setLoadingInfo(items)
   })
   this.loadMoreMessageSub = this.searchservice.noMoreBooksMsg.subscribe(msg => {

    this.loadMoreMessage = msg;
    console.log(this.loadMoreMessage)
   })
  }

  setLoadingInfo(bookArray: Book[]){
    this.booksLoaded = true;
    if (!bookArray.length) this.noResults = true;
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../book';
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

  constructor(private searchservice: SearchService) { }

  handleSearch(inputValue: string){
    this.getBooks = this.searchservice.getBooks(inputValue)
   .subscribe((items: Book[]) => {
      this.books = items;
      if (!items.length) this.noResults = true;
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

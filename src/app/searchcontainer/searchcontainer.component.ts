import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-searchcontainer',
  templateUrl: './searchcontainer.component.html',
  styleUrls: ['./searchcontainer.component.scss']
})
export class SearchcontainerComponent implements OnInit {

  books: Book[] = [];

  constructor(private searchservice: SearchService) { }

  handleSearch(inputValue: string){
    this.searchservice.getBooks(inputValue)
   .subscribe((items: Book[]) => {
      console.log(items)
      this.books = items;
      console.log(this.books)
   })
  }

  ngOnInit(): void {
  }

}

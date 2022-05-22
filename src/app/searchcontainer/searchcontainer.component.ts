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
   .subscribe((items: any) => {
      this.books = items.map((item :any ) => {
        return {
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          volumeLink: item.volumeInfo.infoLink
        }
      })
   })
  }

  ngOnInit(): void {
  }

}

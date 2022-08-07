import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  query: string;
  @ViewChild('searchbar') searchbar : ElementRef;
  //@Output() search: EventEmitter<string> = new EventEmitter<string>();
  constructor(private searchService: SearchService) { }

  searchBooks(): void{
    //this.search.emit(this.query);
    this.searchService.queryChanged(this.query)
  }

  ngOnInit(): void {
  }

}

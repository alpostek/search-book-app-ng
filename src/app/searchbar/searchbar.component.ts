import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements AfterViewInit{
  @ViewChild('searchForm') searchForm: NgForm;

  query: string;
  constructor(private searchService: SearchService) { }

  ngAfterViewInit(): void {
    this.searchForm.form.valueChanges.subscribe(changes => {
      if(!changes.query && this.searchForm.form.dirty){
        this.searchService.resetQuery();
      }   
    })
  }

  searchBooks(): void{
    this.searchService.queryChanged(this.query)
  }

}

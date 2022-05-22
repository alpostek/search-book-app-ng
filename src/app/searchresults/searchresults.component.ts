import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent implements OnInit {

  @Input() books: Book[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}

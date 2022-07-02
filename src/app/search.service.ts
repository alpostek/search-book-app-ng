import {environment} from "../environments/environment";
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, Subscription, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from "./book";
import { QueryParams } from "./query-params";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
//FIX ERROR HANDLINg
  private apiUrl = "https://www.googleapis.com/books/v1/volumes?key=";
  private apiKey = environment.apikey;
  errorMessage = new Subject<string>();
  errorMsg: string;
  currentQuery: QueryParams;
  booksSet = new Subject<Book[]>()

  constructor(private http: HttpClient) {}

  setQuery(passedQuery: QueryParams){
    this.currentQuery = passedQuery;
    console.log(this.currentQuery)
  }

  updateIndex(passedIndex: number){
    this.currentQuery.startIndex = passedIndex;
    console.log(passedIndex)
  }


  getBooks(): Observable<Book[]>{
      const url = `${this.apiUrl}${this.apiKey}&maxResults=10&q=${this.currentQuery.param}${this.currentQuery.query}&startIndex=${this.currentQuery.startIndex ? this.currentQuery.startIndex : 0 }`;
      return this.http.get<Book[]>(url).pipe(
        catchError(this.handleError.bind(this)),
        tap(response => {
          console.log(url)
          console.log(response)
        }),
        map((response: any) =>
        {
          if (response.items){
           return response.items.map((item: any) => {
            return <Book> {
              title: item.volumeInfo.title,
              authors: item.volumeInfo.authors,
              volumeLink: item.volumeInfo.infoLink,
              coverImage: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
              ? item.volumeInfo.imageLinks.thumbnail
              : "https://via.placeholder.com/100x150"
            }
           })
          } else{
             return [];
          }
        },

        )
      )
  }

  handleError(error: HttpErrorResponse ){
    if (error.status === 0) {
      this.errorMsg = `An error occurred:, ${error.error} `;
      console.error(this.errorMsg);
    } else {
      this.errorMsg = `Backend returned code ${error.status}, body was: ${error.error}`
      console.error(this.errorMsg);
    }
    this.errorMessage.next('Something bad happened; please try again later.')
    return throwError(() => new Error(this.errorMsg));
  }



}

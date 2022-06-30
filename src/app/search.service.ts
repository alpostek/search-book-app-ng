import {environment} from "../environments/environment";
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from "./book";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
//FIX ERROR HANDLINg
  private apiUrl = "https://www.googleapis.com/books/v1/volumes?key=";
  private apiKey = environment.apikey;
  errorMessage = new Subject<string>();
  errorMsg: string;

  constructor(private http: HttpClient) {}

  getBooks(query: string): Observable<Book[]>{
      const url = `${this.apiUrl}${this.apiKey}&q=${query}`;
      return this.http.get<Book[]>(url).pipe(
        catchError(this.handleError.bind(this)),
        tap(response => {
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
        }
        )
      )
  }

  handleError(error: HttpErrorResponse ){
    //let errorMsg;
    if (error.status === 0) {
      this.errorMsg = `An error occurred:, ${error.error} `;
      console.error(this.errorMsg);
    } else {
      this.errorMsg = `Backend returned code ${error.status}, body was: ${error.error}`
      console.error(this.errorMsg);
    }
    this.errorMessage.next('Something bad happened; please try again later.')
    //return this.errorMessage
    return throwError(() => new Error(this.errorMsg));
  }



}

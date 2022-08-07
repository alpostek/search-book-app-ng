import {environment} from "../environments/environment";
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError, of } from "rxjs";
import { catchError, map, tap, switchMap, filter } from 'rxjs/operators';
import { Book } from "./book";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
//FIX ERROR HANDLINg
  private apiUrl = "https://www.googleapis2.com/books/v1/volumes?key=";
  private apiKey = environment.apikey;
  //errorMessage = new Subject<string>();
  //errorMsg: string;
  url = `${this.apiUrl}${this.apiKey}`;

  queryParamSubject = new BehaviorSubject<string>("");
  queryParamValue$ = this.queryParamSubject.asObservable();

  constructor(private http: HttpClient) {}

  books$ = this.queryParamValue$.pipe(
    //if query is not empty, do stuff
    switchMap(query => query ? 
      this.http.get<Book[]>(`${this.url}&q=${query}`).pipe(
        tap(response => {
          console.log(response)
        }),
        catchError(this.handleError),
        map((response: any) => {
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
            })
      //if query is empty (beginning of app) return observable of empty arr
      ) : of([])
    )
  )

  queryChanged(query: string): void{
    this.queryParamSubject.next(query)
  }

  handleError(error: HttpErrorResponse) {
    let errorMsg: string;
    if (error.status === 0) {
      errorMsg = `An error occurred:, ${error.error} `;
      console.error(errorMsg);
    } else {
      errorMsg = `Backend returned code ${error.status}, body was: ${error.error}`
      console.error(errorMsg);
    }
    //this.errorMessage.next('Something bad happened; please try again later.')
    return throwError(() => new Error(errorMsg));
  }



}

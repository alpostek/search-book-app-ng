import {environment} from "../environments/environment";
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError, of, combineLatest, Subject } from "rxjs";
import { catchError, map, tap, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { Book } from "./book";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = "https://www.googleapis.com/books/v1/volumes?key=";
  private apiKey = environment.apikey;
  url = `${this.apiUrl}${this.apiKey}`;

  queryParamSubject = new BehaviorSubject<string>("");
  queryParamValue$ = this.queryParamSubject.asObservable();

  private noResultsSubject = new BehaviorSubject<boolean>(false);
  noResultsMessage$ = this.noResultsSubject.asObservable();

  startIndex = new BehaviorSubject<number>(0);
  startIndex$ = this.startIndex.asObservable();

  maxIndex = 40;
  areThereMoreBooksSubj = new BehaviorSubject<boolean>(false);
  areThereMoreBooks$ = this.areThereMoreBooksSubj.asObservable();

  constructor(private http: HttpClient) {}

  books$ = combineLatest([
    this.queryParamValue$,
    this.startIndex$
  ]).pipe(
      switchMap(([query, index]) => query ? 
        this.http.get<Book[]>(`${this.url}&q=${query}&startIndex=${index}&maxResults=20`).pipe(
          tap(response => {
            console.log(response)
          }),
          catchError(this.handleError),
          map((response: any) => {
            if (response.items){
              this.noResultsSubject.next(false);
              this.areThereMoreBooksSubj.next(this.maxIndex - this.startIndex.value > 0);
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
                  console.log("here")
                  this.noResultsSubject.next(true);
                  return [];
                }
              })
        //if query is empty (beginning of app) return observable of empty arr
        ) : of([])
      )
  )
 
  queryChanged(query: string): void{
    this.queryParamSubject.next(query)
    this.startIndex.next(0);
  }

  resetQuery(){
    this.queryParamSubject.next("");
    this.startIndex.next(0);
    this.areThereMoreBooksSubj.next(false);
  }

  loadMoreBooks(): void{
    this.startIndex.next( this.startIndex.value + 20);
    //console.log(this.maxIndex - this.startIndex.value > 0);
    this.areThereMoreBooksSubj.next(this.maxIndex - this.startIndex.value > 0 );
  }

  handleError(error: HttpErrorResponse) {
    let errorMsg: string;
    if (error.status === 0) {
      errorMsg = `A client-side or network error occurred:, ${error.error} `;
      console.error(errorMsg);
    } else {
      errorMsg = `Backend returned code ${error.status}, body was: ${error.error}`
      console.error(errorMsg);
    }
    return throwError(errorMsg);
  }



}

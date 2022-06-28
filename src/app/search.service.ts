import {environment} from "../environments/environment";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map, tap, catchError } from 'rxjs/operators';
import { of} from 'rxjs';
import { Book } from "./book";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = "https://www.googleapis.com/books/v1/volumes?key=";
  private apiKey = environment.apikey;

  constructor(private http: HttpClient) {}

  getBooks(query: string): Observable<Book[]>{
      const url = `${this.apiUrl}${this.apiKey}&q=${query}`;
      return this.http.get<Book[]>(url).pipe(
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
}

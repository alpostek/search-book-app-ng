import {environment} from "../environments/environment";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = "https://www.googleapis.com/books/v1/volumes?key=";
  private apiKey = environment.apikey;

  constructor(private http: HttpClient) {}

  getBooks(query: string): Observable<any>{
      const url = `${this.apiUrl}${this.apiKey}&q=${query}`;
      console.log(url)
      return this.http.get(url).pipe(
        map((response: any) => response.items )
      )
  }
}

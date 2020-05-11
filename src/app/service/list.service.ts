import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Listitems } from '../models/listitems' 
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ListService {
  data: string;
  base_path = 'https://ansr.club/api/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.statusText}`);
    } 
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.' );
  };

  getList(code): Observable<Listitems> {
    return this.http
      .get<Listitems>(this.base_path+code)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}

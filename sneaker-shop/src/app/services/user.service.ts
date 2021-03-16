import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cabinet } from '../interfaces/cabinet';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private userUrl = 'https://powerful-shelf-56164.herokuapp.com/api/user';

  getUser(): Observable<Cabinet> {
    return this.http.get<Cabinet>(this.userUrl).pipe(
      catchError(this.handleError<Cabinet>(`getUser`))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

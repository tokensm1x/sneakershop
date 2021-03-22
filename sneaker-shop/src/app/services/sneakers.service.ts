import { Injectable } from '@angular/core';
import { Sneaker } from '../interfaces/sneaker';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SneakersService {

  constructor(private http: HttpClient) {}

  private sneakersUrl = 'https://powerful-shelf-56164.herokuapp.com/api/sneakers';
  private shopsUrl = 'https://powerful-shelf-56164.herokuapp.com/api/shops';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getSneakers(): Observable<Sneaker[]> {
    return this.http.get<Sneaker[]>(this.sneakersUrl)
    .pipe(
      catchError(this.handleError<Sneaker[]>('getSneakers', []))
    );
  }

  getSneaker(id: number): Observable<Sneaker> {
    const url = `${this.sneakersUrl}/${id}`;
    return this.http.get<Sneaker>(url).pipe(
      catchError(this.handleError<Sneaker>(`getHero id=${id}`))
    );
  }

  getShop(id: number): Observable<any> {
    const url = `${this.shopsUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`shops id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

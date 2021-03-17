import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cabinet } from '../interfaces/cabinet';
import { userPassword } from '../interfaces/userPassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private userUrl = 'https://powerful-shelf-56164.herokuapp.com/api/user';
  private passwordUrl = 'https://powerful-shelf-56164.herokuapp.com/api/password';
  private cartUrl = 'https://powerful-shelf-56164.herokuapp.com/api/cart';
  private fromCartUrl = 'https://powerful-shelf-56164.herokuapp.com/api/fromcart';
  private clearCartUrl = 'https://powerful-shelf-56164.herokuapp.com/api/clear';
  private buyUrl = 'https://powerful-shelf-56164.herokuapp.com/api/buysneakers';
  private historyUrl = 'https://powerful-shelf-56164.herokuapp.com/api/history';


  getUser(): Observable<Cabinet> {
    return this.http.get<Cabinet>(this.userUrl).pipe(
      catchError(this.handleError<Cabinet>(`getUser`))
    );
  }

  changePassword(user: userPassword): Observable<any> {
    return this.http.put(this.passwordUrl, user, this.httpOptions);

  }

  getUserCart(): Observable<any> {
    return this.http.get<any>(this.fromCartUrl).pipe(
      catchError(this.handleError<Cabinet>(`getCart`))
    );
  }

  updateUserCart(user): Observable<any> {
    return this.http.put<any>(this.cartUrl, user, this.httpOptions);
  }

  clearUserCart(): Observable<any> {
    return this.http.delete<any>(this.clearCartUrl, this.httpOptions);
  }

  userBuy(sneakers): Observable<any> {
    return this.http.post(this.buyUrl, sneakers, this.httpOptions);
  }

  userHistory(): Observable<any> {
    return this.http.get(this.historyUrl);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

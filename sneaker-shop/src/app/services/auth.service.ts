import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl: string = "https://powerful-shelf-56164.herokuapp.com/api/register";
  private loginUrl: string = "https://powerful-shelf-56164.herokuapp.com/api/login";

  constructor(private http: HttpClient,
              private router: Router) { }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logoutUser(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }
}

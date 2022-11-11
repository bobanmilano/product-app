import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { TokenResponse } from '../models/response';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, 
    private messageService: MessageService,
    private tokenStorage: TokenStorageService) { }

  signup(data: FormGroup): Observable<any> {
    let url = baseUrl + '/auth/signup';
    let body = new URLSearchParams();

    let password = encodeURIComponent(data.get("password")?.value);
    body.set('email', data.get('email')?.value);
    body.set('password', password);

    let options = { headers:  new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    }) };

    return this.http.post<TokenResponse>(url, body.toString(), options).pipe(
      tap(_ => this.log('signup')),
      catchError(this.handleError<any>('signup()'))
    );
  }

  signin(data: FormGroup): Observable<any> {
    let url = baseUrl + '/auth/signin';
    let body = new URLSearchParams();

    let password = encodeURIComponent(data.get("password")?.value);
    body.set('email', data.get('email')?.value);
    body.set('password', password);
    body.set('remember', data.get("remember")?.value.toString());

    let options = { headers:  new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    }) };

   return this.http.post<TokenResponse>(url, body.toString(), options).pipe(
    tap(_ => this.log('signup')),
    catchError(this.handleError<any>('signin()')));
  }

  signout() {
    this.tokenStorage.signOut();
    this.log("signed out");
  }

  signedId() {
    return this.tokenStorage.getToken() !== null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add("[" + new Date().toString() + "]" + ` -- Auth Service -- ${message}`);
  }

}



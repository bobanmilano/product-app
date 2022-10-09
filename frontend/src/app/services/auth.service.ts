import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { TokenResponse } from '../models/response';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  signup(data: FormGroup): Observable<any> {
    let url = baseUrl + '/auth/signup';
    let body = new URLSearchParams();

    let password = encodeURIComponent(data.get("password")?.value);
    body.set('email', data.get('email')?.value);
    body.set('password', password);

    let options = { headers:  new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    }) };

    return this.http.post<TokenResponse>(url, body.toString(), options);
  }

  signin(data: FormGroup): Observable<any> {
    let url = baseUrl + '/auth/signin';
    let body = new URLSearchParams();

    let password = encodeURIComponent(data.get("password")?.value);
    body.set('email', data.get('email')?.value);
    body.set('password', password);

    let options = { headers:  new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    }) };

   return this.http.post<TokenResponse>(url, body.toString(), options);
  }

  signedId() {
    return this.tokenStorage.getToken() !== null;
  }

}

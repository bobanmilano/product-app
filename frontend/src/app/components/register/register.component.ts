import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { TokenResponse } from 'src/app/models/response';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  errorMessage!: string;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  register() {
    if(this.form.valid) {
      this.authService.signup(this.form).subscribe((response ) => {
          if(response != null) {
            this.tokenService.saveToken(response.access_token);
            this.router.navigate(['dashboard'])
          }
      })
    }
  }

}
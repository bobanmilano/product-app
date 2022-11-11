import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  remember = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      remember: new FormControl("")
    });
  }

  login() {
    this.form.patchValue({remember: this.remember});
    if(this.form.valid) {
      this.authService.signin(this.form).subscribe((response) => {
        this.tokenService.saveToken(response.access_token);
        this.router.navigate([''])
      })
    } 
  }

  toggleRemember(event) {
    this.remember = !this.remember;
  } 

}

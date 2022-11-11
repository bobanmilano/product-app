import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit{
  title = 'Products';
  loggedOut: boolean = false;

  
  constructor(private tokenService: TokenStorageService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    if(this.tokenService.getToken() === null) this.loggedOut = true;
    else this.loggedOut = false;
  }

  ngDoCheck(): void {
    if(this.tokenService.getToken() === null) this.loggedOut = true;
    else this.loggedOut = false;
  }

  
  logout() {
    this.router.navigate(["/login"]);
    this.authService.signout();
  }

  getToken() {
    return this.tokenService.getToken();
  }
}

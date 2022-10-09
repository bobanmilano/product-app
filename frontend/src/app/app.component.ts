import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  showMenu: boolean = false;

  constructor(private tokenService: TokenStorageService, private router: Router) {}

  ngDoCheck(): void {
    if(this.tokenService.getToken() === null) this.showMenu = true;
    else this.showMenu = false;
  }
  
  logout() {
    localStorage.clear();
    this.tokenService.signOut();
    this.router.navigate(["/"]);
  }
}

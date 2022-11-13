import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthUserDto } from 'src/app/models/dto/auth-user-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenStorageService
  ) {}

  login(authUserDto: AuthUserDto) {
      this.authService.signin(authUserDto).subscribe((response) => {
        this.tokenService.saveToken(response.access_token);
        this.router.navigate([''])
      })    
  }

}

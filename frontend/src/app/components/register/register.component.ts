import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthUserDto } from 'src/app/models/dto/auth-user-dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenStorageService
  ) {}

  register(authUserDto: AuthUserDto) {
      this.authService.signup(authUserDto).subscribe((response ) => {
          if(response != null) {
            this.tokenService.saveToken(response.access_token);
            this.router.navigate(['dashboard'])
          }
      })
  }

}
/* eslint-disable */
import { Body, Controller, Param, ParseBoolPipe, Post } from '@nestjs/common';
import { domainToASCII } from 'url';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto, (dto.remember == "true"));
  }

}
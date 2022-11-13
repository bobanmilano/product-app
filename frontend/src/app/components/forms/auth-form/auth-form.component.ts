import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserDto } from 'src/app/models/dto/auth-user-dto';

@Component({
  selector: 'app-auth',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthComponent implements OnInit {
  @Output() loginEvent = new EventEmitter<AuthUserDto>();
  @Output() registerEvent = new EventEmitter<AuthUserDto>();
  @Input() login: boolean; 
  form!: FormGroup;
  remember = false;

  constructor() { }

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

  toggleRemember(event) {
    this.remember = !this.remember;
  } 

  onSubmit() {
    var authUserDto = new AuthUserDto();
    authUserDto.email = this.form.controls["email"].value,
    authUserDto.password = this.form.controls["password"].value,
    authUserDto.remember = this.remember;

    if(this.login) {
      this.loginEvent.emit(authUserDto);
    } else {
      this.registerEvent.emit(authUserDto);
    }
  }

}

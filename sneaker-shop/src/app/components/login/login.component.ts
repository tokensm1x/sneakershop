import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.router.navigate(['/shop']);
    }
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('^[_0-9a-zA-Z ]*')
  ]);

  loginUser(): void {
    this.auth.loginUser({
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    })
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/shop']);
      },
      err => {
        if(err.status === 401){
          if(localStorage.getItem('lang') === 'ru') {
            alert('Неправильный логин или пароль')
          } else {
            alert('Incorrect login or password')
          }
        };
        console.error(err);
      }
    );
  };

}

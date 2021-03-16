import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

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

  registerUser(): void {
    this.auth.registerUser({
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    })
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/shop']);
      },
      err => console.error(err)
    );
  }
}

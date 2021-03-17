import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cabinet } from 'src/app/interfaces/cabinet';
import { userPassword } from 'src/app/interfaces/userPassword';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  currentPassword: string;

  newPassword: string;

  user: userPassword = {
    email: "",
    newPassword: "",
    password: ""
  };

  error : boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Cabinet,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  changePassword(): void {
    this.error = false;
    this.user.email = this.data.email;
    this.user.newPassword = this.passwordFormControl.value;
    this.user.password = this.currentPassword;
    this.userService.changePassword(this.user).subscribe(
      res => {
      },
      err => {
        if(err.status === 401){
        alert('Incorrect current password');
        this.error = true;
      }
      if(this.error === false) {
        alert('Password changed');
      }
    });
  }

  passwordFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('^[_0-9a-zA-Z ]*')
  ]);
}

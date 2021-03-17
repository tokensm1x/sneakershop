import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cabinet } from 'src/app/interfaces/cabinet';
import { UserService } from 'src/app/services/user.service';
import { PasswordComponent } from '../password/password.component';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  user: Cabinet;

  loaded: boolean = false;

  constructor(private userService: UserService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUser();
  }

  openDialog() {
    this.dialog.open(PasswordComponent, {data: this.user});
  }

  getUser(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.loaded = !this.loaded;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Cabinet } from 'src/app/interfaces/cabinet';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  user: Cabinet;

  loaded: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.loaded = !this.loaded;
    })
  }

}

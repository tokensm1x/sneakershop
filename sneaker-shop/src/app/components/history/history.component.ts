import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private userService: UserService) { }

  history: any;

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory(): void {
    this.userService.userHistory().subscribe(data => {
      this.history = data;
    })
  }
}

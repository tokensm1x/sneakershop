import { Component, OnInit } from '@angular/core';
import { Sneaker } from 'src/app/interfaces/sneaker';
import { SneakersService } from 'src/app/services/sneakers.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SneakerDetailComponent } from '../sneaker-detail/sneaker-detail.component';


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  sneakers: Sneaker[] = [];

  pageSneakers: Sneaker[] = [];

  loaded: boolean = false;

  indexPage = 0;
  sizePage = 5;

  constructor(private sneakersService: SneakersService) { }

  ngOnInit(): void {
    this.getSneakers();
  }

  getSneakers(): void {
    this.sneakersService.getSneakers().subscribe(sneakers => {
      this.sneakers = sneakers;
      this.loaded = !this.loaded;
      this.pageSneakers = this.sneakers.slice(this.indexPage, this.sizePage);
    });
  }

  changePage(paginator: MatPaginator): void {
    if (!paginator.pageIndex) {
      this.pageSneakers = this.sneakers.slice(this.indexPage, this.sizePage);
    }
    else {
      this.pageSneakers = this.sneakers.slice(paginator.pageIndex * paginator.pageSize,
        (paginator.pageIndex * paginator.pageSize) + paginator.pageSize);
    }
  }

}

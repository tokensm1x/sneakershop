import { Component, OnInit } from '@angular/core';
import { Sneaker } from 'src/app/interfaces/sneaker';
import { SneakersService } from 'src/app/services/sneakers.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SneakerDetailComponent } from '../sneaker-detail/sneaker-detail.component';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  sneakers: Sneaker[] = [];

  allSneakers: Sneaker[];

  pageSneakers: Sneaker[] = [];

  loaded: boolean = false;

  color: string;

  brand: string;

  indexPage: number = 0;

  sizePage: number = 5;

  searchValue: string;

  paginatorLength: number = 15;

  findSneakers: any[] = [];

  empty: boolean = false;

  constructor(private sneakersService: SneakersService) { }

  ngOnInit(): void {
    this.getSneakers();
  }

  getSneakers(): void {
    this.sneakersService.getSneakers().subscribe(sneakers => {
      this.sneakers = sneakers;
      this.allSneakers = sneakers;
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

  filter(): void {
    let filteredColorSneakers = this.allSneakers.filter( el => {
      if(this.color) {
        return el.color === this.color;
      }
      return el;
    });
    let filteredSneakers = filteredColorSneakers.filter( el => {
      if(this.brand) {
        return el.brand === this.brand;
      }
      return el;
    });
    this.sneakers = filteredSneakers;
    this.pageSneakers = this.sneakers.slice(this.indexPage, this.sizePage);
    this.paginatorLength = this.sneakers.length;
    this.searchValue = '';
    if(!this.paginatorLength) {
      this.empty = true;
    } else {
      this.empty = false;
    }
  }

  resetFilters(): void {
    this.color = undefined;
    this.brand = undefined;
    this.sneakers = this.allSneakers;
    this.pageSneakers = this.sneakers.slice(this.indexPage, this.sizePage);
    this.paginatorLength = 15;
    this.empty = false;
    this.searchValue = '';
  }

  search() : void {
    this.findSneakers = [];
    this.color = undefined;
    this.brand = undefined;
    let values;
    for(let i = 0; i < this.allSneakers.length; i++) {
      values = Object.values(this.allSneakers[i])
      .filter((el, i) => i !== 0 && i !== Object.values(this.allSneakers[i]).length-1);
      for(let j = 0; j < values.length; j++) {
        if(String(values[j]).toLowerCase().includes(this.searchValue.toLowerCase())) {
          this.findSneakers.push(this.allSneakers[i]);
          break;
        }
      }
    }
    this.sneakers = this.findSneakers;
    this.pageSneakers = this.sneakers.slice(this.indexPage, this.sizePage);
    this.paginatorLength = this.sneakers.length;
    if(!this.paginatorLength) {
      this.empty = true;
    } else {
      this.empty = false;
    }
  }

}

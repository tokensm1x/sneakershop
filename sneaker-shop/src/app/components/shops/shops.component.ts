import { Component, OnInit } from '@angular/core';
import { Sneaker } from 'src/app/interfaces/sneaker';
import { SneakersService } from 'src/app/services/sneakers.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SneakerDetailComponent } from '../sneaker-detail/sneaker-detail.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  sneakers: Sneaker[] = [];

  allSneakers: Sneaker[];

  pageSneakers: Sneaker[] = [];

  loaded: boolean = false;

  color: string;

  brand: string;

  shop: string;

  indexPage: number = 0;

  sizePage: number = 5;

  searchValue: string;

  paginatorLength: number = 15;

  findSneakers: any[] = [];

  empty: boolean = false;

  allShops : string[] = ["OMGShop", "StockShop", "AMShop", "FLShop"]

  constructor(private route: ActivatedRoute,
    private sneakersService: SneakersService) { }

  ngOnInit(): void {
    this.getSneakers();
  }

  getShop(): void {
    setTimeout (() => {
      const shopName = this.route.snapshot.paramMap.get('id');
      console.log(shopName);
      this.shop = shopName;
      this.filterPage();

    })

  }

  getSneakers(): void {
    this.sneakersService.getSneakers().subscribe(sneakers => {
      this.sneakers = sneakers;

      this.loaded = !this.loaded;
      this.pageSneakers = this.sneakers.slice(this.indexPage, this.sizePage);
      this.getShop();
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

  check(): void {
    if(localStorage.getItem('buy')) {
      let buy = JSON.parse(localStorage.getItem('buy'));
      let idS = [];
      let filterID = this.sneakers.filter((el) => {
        for(let i = 0; i < buy.length; i++) {
          if(el.id === buy[i].id && this.shop === buy[i].shops) {
            idS.push(el.id);
            break;
          }
        }
        if(!idS.includes(el.id)) {
          return el;
        } return 0;
      })
      console.log(filterID)
      this.sneakers = filterID;
      console.log(this.sneakers)
      this.pageSneakers = this.sneakers.slice(this.indexPage, this.sizePage);
      this.paginatorLength = this.sneakers.length;
      this.searchValue = '';
      if(!this.paginatorLength) {
        this.empty = true;
      } else {
        this.empty = false;
      }
      this.allSneakers = filterID;
    }

  }

  filterPage(): void {
    let filteredShopSneakers = this.sneakers.filter( el => {
        return el.shops.includes(this.shop);
    })
    this.sneakers = filteredShopSneakers;
    this.pageSneakers = this.sneakers.slice(this.indexPage, this.sizePage);
    this.paginatorLength = this.sneakers.length;
    this.searchValue = '';
    if(!this.paginatorLength) {
      this.empty = true;
    } else {
      this.empty = false;
    }
    this.allSneakers = filteredShopSneakers;
    this.check();
  }

  filter(): void {
    console.log(this.allSneakers)
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
    console.log(filteredSneakers)
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
    this.paginatorLength = this.allSneakers.length;
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

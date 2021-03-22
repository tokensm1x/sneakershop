import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cabinet } from 'src/app/interfaces/cabinet';
import { Sneaker } from 'src/app/interfaces/sneaker';
import { SneakersService } from 'src/app/services/sneakers.service';
import { UserService } from 'src/app/services/user.service';
import { DialogBuyComponent } from '../dialog-buy/dialog-buy.component';
import { DialogMoneyComponent } from '../dialog-money/dialog-money.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private sneakersService: SneakersService,
              private userService: UserService,
              public dialog: MatDialog,
              private router: Router) { }

  loaded: boolean = false;

  sneakers: Sneaker[];

  error: boolean = false;

  sneakersCart;

  cartSneakers: Sneaker[];

  price: number = 0;

  cartClear: boolean = false;

  payment : string;

  user: Cabinet;

  ngOnInit(): void {
    this.getSneakers();
    this.getUser();
  }

  getSneakers(): void {
    this.sneakersService.getSneakers().subscribe(
      sneakers => {
        this.sneakers = sneakers;
        this.getSneakersFromCart()
      }
    )
  }

  getSneakersFromCart() : void {
    this.userService.getUserCart().subscribe(
      sneakers => {
        this.sneakersCart = sneakers;
        console.log(this.sneakersCart)
        let arr = this.sneakersCart.map( el => el.id)
        this.cartSneakers = this.sneakers.filter( (el, i) => {
          if(arr.includes(el.id)) {
            el.size = this.sneakersCart[arr.indexOf(el.id)].size;
            el.stock = this.sneakersCart[arr.indexOf(el.id)].num;
            el.shops = this.sneakersCart[arr.indexOf(el.id)].shop;
          }
          return arr.includes(el.id);
        })
        this.loaded = !this.loaded;
        this.totalPrice();
        console.log(this.cartSneakers)
      }
    )
  }

  totalPrice() : void {
    let count = this.cartSneakers.map((el ) => {
      return el.price * el.stock
    })
    for(let i =0; i < count.length; i++) {
      this.price += count[i];
    }
    if(this.price) this.cartClear = true;
  }

  clearCart() : void {
    this.userService.clearUserCart().subscribe();
    this.price = 0;
    this.cartClear = false;
  }

  nameControl = new FormControl('', [
    Validators.required
  ]);

  nameLastControl = new FormControl('', [
    Validators.required
  ]);
  addressControl = new FormControl('', [
    Validators.required
  ]);
  cityControl = new FormControl('', [
    Validators.required
  ]);

  telControl = new FormControl('', [
    Validators.pattern('^[0-9]*'),
    Validators.required,
    Validators.minLength(9)
  ]);

  getUser(): void {
    this.userService.getUser()
    this.userService.getUser().subscribe(user => {
      this.user = user;
    })
  }

  buy(): void {
    if(this.price > this.user.cash) {
      this.openDialogMoney();
    } else {
      let info = {
        name: "",
        lastName: "",
        address: "",
        city: "",
        tel: "",
        price: undefined,
        date: undefined
      };
      info.name = this.nameControl.value;
      info.lastName = this.nameLastControl.value;
      info.address = this.addressControl.value;
      info.city = this.nameLastControl.value;
      info.tel = this.telControl.value;
      info.price = this.price;
      let date = new Date();
      let day, month, year;
      if(date.getDate() < 10) {
        day = `0${date.getDate()}`
      } else {
        day = date.getDate();
      }
      if(date.getMonth() < 10) {
        month = `0${date.getMonth()}`
      } else {
        month = date.getMonth();
      }
      info.date = `${day}.${month}.${date.getFullYear()}`;
      let buySneakers = this.cartSneakers;
      if(localStorage.getItem(`buy`)) {
        let buy = JSON.parse(localStorage.getItem(`buy`));
        console.log(buy)
        buy = [...buy, ...this.cartSneakers];
        localStorage.setItem('buy', JSON.stringify(buy));
      } else {
        let buy = this.cartSneakers;
        localStorage.setItem('buy', JSON.stringify(buy));
      }
      this.userService.userBuy({info: info, buy: buySneakers}).subscribe(
        req => {
        }, err => {
          if(err.status === 401){
            alert('error');
            this.error = true;
          }
          if(this.error === false) {
            this.openDialogBuy();
            this.clearCart()
            this.router.navigate(['/history']);
          }
      })
    }
  }

  openDialogMoney() {
    this.dialog.open(DialogMoneyComponent, {data: this.user});
  }

  openDialogBuy() {
    this.dialog.open(DialogBuyComponent);
  }
}

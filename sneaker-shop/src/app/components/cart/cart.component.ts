import { Component, OnInit } from '@angular/core';
import { Sneaker } from 'src/app/interfaces/sneaker';
import { SneakersService } from 'src/app/services/sneakers.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private sneakersService: SneakersService) { }

  sneakers: Sneaker[];

  sneakersCart: Sneaker[];

  cartSneakers: Sneaker[];

  ngOnInit(): void {
    this.getSneakers();
  }

  getSneakers(): void {
    this.sneakersService.getSneakers().subscribe(
      sneakers => {
        this.sneakers = sneakers;
        this.getSneakersFromCart();
      }
    )
  }

  getSneakersFromCart() : void {
    if(localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart'));
      let arr = [];
      cart.forEach( el => {
        arr = [...Object.keys(el), ...arr];
      })
      this.cartSneakers = this.sneakers.filter( el => arr.includes(el.id + ""));
      console.log(this.cartSneakers)
    }
  }
}

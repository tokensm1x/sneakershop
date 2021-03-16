import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sneaker } from 'src/app/interfaces/sneaker';
import { SneakersService } from 'src/app/services/sneakers.service';

@Component({
  selector: 'app-sneaker-detail',
  templateUrl: './sneaker-detail.component.html',
  styleUrls: ['./sneaker-detail.component.scss']
})
export class SneakerDetailComponent implements OnInit {

  sneaker!: Sneaker;

  selectedValue: number | undefined;

  loaded: boolean = false;

  buttonActive: boolean = true;

  constructor(private route: ActivatedRoute,
              private sneakerService: SneakersService  ) {}

  ngOnInit(): void {
    this.getHero();

  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.sneakerService.getSneaker(id)
      .subscribe(sneaker => {
        this.sneaker = sneaker;
        this.loaded = !this.loaded;
      })
  }

  chooseSize(): boolean {
    if(localStorage.getItem('cart')){
      let id = this.sneaker.id + "";
      let cart = JSON.parse(localStorage.getItem('cart'));
      cart.forEach( el => {
        if(el[id] === 3 ) this.buttonActive = false;
      })
    }
    if(this.selectedValue && this.buttonActive) {
      return false;
    }
    return true;
  }

  addCart(): void {
    let id = this.sneaker.id + "";
    if(localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart'));
      let arr = [];
      for (let el of cart) {
        arr = [...arr, ...Object.keys(el)];
      }
      if(arr.includes(id)) {
        if(cart[arr.indexOf(id)][id] === 3) {
          this.buttonActive = false;
        } else {
          cart[arr.indexOf(id)][id]++;
        }
      } else {
        let obj = {};
        obj[id] = 1;
        cart.push(obj);
      }
    localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      let cart = [];
      let obj = {};
      obj[id] = 1;
      cart.push(obj);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
}


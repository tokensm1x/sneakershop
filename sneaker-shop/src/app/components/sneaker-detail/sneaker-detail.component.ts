import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sneaker } from 'src/app/interfaces/sneaker';
import { SneakersService } from 'src/app/services/sneakers.service';
import { UserService } from 'src/app/services/user.service';

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

  opened: boolean = false;

  styleImg: string = 'width:200px; max-height: 266px; cursor: pointer'

  constructor(private route: ActivatedRoute,
              private sneakerService: SneakersService,
              private userService: UserService,
              private router: Router ) {}

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
    if(this.selectedValue) {
      return false;
    }
    return true;
  }

  addCart(): void {
    let id = this.sneaker.id;
    let size = this.selectedValue;
    let num = 1;
    this.userService.updateUserCart({id, size, num}).subscribe();
    setTimeout(() => {
      this.router.navigate(['/cart']);
    }, 500);
  }

  enlargeImg(): void {
    this.opened = !this.opened;
    if(this.opened) {
      this.styleImg = 'width:300px; position: absolute; transition: .7s; z-index: 500; cursor:pointer;'
    } else {
      this.styleImg = 'width:200px; position: static;transition: .7s; max-height: 266px; cursor: pointer';
    }
  }


}


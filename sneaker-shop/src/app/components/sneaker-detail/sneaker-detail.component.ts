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

  styleImg: string = 'width:200px;'



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
    this.router.navigate(['/cart']);
  }

  enlargeImg(): void {
    this.styleImg = 'width:350px; position: absolute; transition: .7s; z-index: 500;'
    this.opened = true;
  }

  decreaseImg(): void {
      this.styleImg = 'width:250px; position: static;transition: .5s';
      this.opened = false;
  }

}


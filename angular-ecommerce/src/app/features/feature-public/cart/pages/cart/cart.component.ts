import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  cart:any[] = [];

  constructor(private authService:AuthService, private fetchData:FetchDataService) { }

  ngOnInit(): void {
    this.fetchData.cart().subscribe((cart:any) => {
      this.cart = cart;
    });
  }

}

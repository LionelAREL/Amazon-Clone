import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.sass']
})
export class CartListComponent implements OnInit {

  cart:any;
  constructor(private fetchData:FetchDataService) { }

  ngOnInit(): void {
    this.fetchData.cart().subscribe((cart:any) => {
      this.cart = cart;
    });
  }

}

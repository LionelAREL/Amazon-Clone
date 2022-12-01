import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { EventService } from 'src/app/core/service/event.service';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart:any[] = [];
  total:number = 0;

  numberChoice:number[] = []


  constructor(private authService:AuthService, private fetchData:FetchDataService,private eventService:EventService) { }

  ngOnInit(): void {
    this.getCart();

    for(let i = 2;i<11;i++){
      this.numberChoice.push(i);
    }
  }

  getCart(){
    this.fetchData.cart().subscribe((cart:any) => {
      this.cart = cart;
      console.log(this.cart)
      this.totalOrder();
    });
  }

  totalOrder(){
    let total = 0;
    for(let order of this.cart){
      total = total + order.quantity * order.product.price
    }
    this.total = total/100;
  }

  addToCart(productId:any,quantity:any){
    if(productId != null){
      this.fetchData.addToCart(productId,quantity,false).subscribe({
        next:(detail) => {console.log(detail);this.eventService.emmitEvent({name:"addToCart"});quantity == 0 ? this.getCart() : "";this.totalOrder()},
        error:(error) => console.log(error),
      })
    }
  }
}

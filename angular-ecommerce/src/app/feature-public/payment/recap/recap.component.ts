import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss']
})
export class RecapComponent implements OnInit {

  adresse:any;
  cart:any;
  total:number = 0;

  showFirst:boolean = true;
  message:string = "";

  constructor(private fetchData:FetchDataService, private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.getSession();
    this.getCart();
  }


  payment(){
    this.fetchData.stripeUrl().subscribe({
      next:(link:any) => {
        window.location.href = link.payment_url;},
      error:(error) => {
        this.message = error;
      }
    })
  }

  getSession(){
    this.authService.session().subscribe({
      next:(session) => {
        console.log(session)
        this.adresse = session?.address;
      },
      error:(error) => {},
    });
  }
  updateShowFirst(){
    this.showFirst = !this.showFirst;
    this.getSession();
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
}

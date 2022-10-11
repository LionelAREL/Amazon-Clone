import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EventService } from 'src/app/core/service/event.service';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  numberChoice:number[] = []

  productId:string|null = "";

  product:any;

  messageError:string = "";
  
  constructor(private route: ActivatedRoute,private fetchData:FetchDataService,private eventService:EventService) { }
    
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProduct();
    for(let i = 2;i<11;i++){
      this.numberChoice.push(i);
    }
    console.log(this.numberChoice)
  }

  getProduct(){
    if(this.productId != null){
      this.fetchData.product(this.productId).subscribe({
        next:(product) => this.product = product,
        error:(error) => this.messageError = error,
      });
    }
  }

  addToCart(quantity:any){
    if(this.productId != null){
      this.fetchData.addToCart(this.productId,quantity,true).subscribe({
        next:(detail) => {console.log(detail);this.eventService.emmitEvent({name:"addToCart"})},
        error:(error) => this.messageError = error,
      })
    }
  }
}

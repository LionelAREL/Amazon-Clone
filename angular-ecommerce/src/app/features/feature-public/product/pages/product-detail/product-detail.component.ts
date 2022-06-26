import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})
export class ProductDetailComponent implements OnInit {

  productId:string|null = "";
  
  constructor(
    private route: ActivatedRoute,
    ) { }
    
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log(this.productId)
  }

}

import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  ordered:any;

  constructor(private fetchData:FetchDataService) { }

  ngOnInit(): void {
    this.getOrder()
  }

  getOrder(){
    this.fetchData.ordered().subscribe((order:any) => {
      this.ordered = order;
      console.log(order)
    });
  }

}

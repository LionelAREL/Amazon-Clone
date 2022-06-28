import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.sass']
})
export class RecapComponent implements OnInit {

  constructor(private fetchData:FetchDataService, private router:Router) { }

  ngOnInit(): void {
  }

  message:string = "";

  payment(){
    this.fetchData.stripeUrl().subscribe({
      next:(link:any) => {
        window.location.href = link.payment_url;},
      error:(error) => {
        this.message = error;
      }
    })
  }
}

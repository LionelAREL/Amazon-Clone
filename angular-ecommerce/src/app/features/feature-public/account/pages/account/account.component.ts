import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

  addresses:any[] = []
  constructor(private fetchData:FetchDataService) { }

  ngOnInit(): void {
    this.getAddresses();
  }


  getAddresses(){
    this.fetchData.addresses().subscribe({
      next:(addresses:any) => {
        this.addresses = addresses;
        console.log(this.addresses);
      },
    });
  }


}

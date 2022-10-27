import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.scss']
})
export class AdressesComponent implements OnInit {

  adresses:any;
  constructor(private fetchData:FetchDataService) { }

  ngOnInit(): void {
    this.getAddresses();
  }


  getAddresses(){
    this.fetchData.addresses().subscribe({
      next:(addresses:any) => {
        this.adresses = addresses;
        console.log(this.adresses);
      },
    });
  }

}

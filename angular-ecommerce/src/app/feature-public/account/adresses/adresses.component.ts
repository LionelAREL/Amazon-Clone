import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.scss']
})
export class AdressesComponent implements OnInit {

  errorMessage:string = ""

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

  deleteAdresse(id:any){
    console.log("print")
    this.fetchData.deleteAdresse(id).subscribe({
      next:() => {
        this.getAddresses();
        // console.log(this.adresses);
      },
      error:(error) => {
        this.errorMessage = error
      }
    });
  }
}

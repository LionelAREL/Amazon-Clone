import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  addressForm = new FormGroup({
    address_line_1: new FormControl(''),
    address_line_2: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    zip_code: new FormControl(''),
    default: new FormControl(false),
    });

  message:string ="";

  constructor(private fetchData:FetchDataService,private router:Router) { }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.addressForm)
    this.fetchData.postAddress(this.addressForm.value).subscribe({
      next:(response:any) => {
        this.message = "Your address was created"; 
        console.log(response)
        if(response.default){
          this.submitAdresse(response)
        }
      },
      error: (error) => {

      },
    });
  }

  submitAdresse(addresse:any){
    this.fetchData.postSelectedAddress(addresse).subscribe({
      next:(message) => {
        console.log(message)
      },
      error:(messageError) => {
        console.log(messageError)
      },
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.sass']
})
export class CreateAddressComponent implements OnInit {

  message:string = "";

  addressForm = new FormGroup({
    address_line_1: new FormControl(''),
    address_line_2: new FormControl(''),
    city: new FormControl(''),
    zip_code: new FormControl(''),
    default: new FormControl(false),
    });

  constructor(private fetchData:FetchDataService,private router:Router) { }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.addressForm)
    this.fetchData.postAddress(this.addressForm.value).subscribe({
      next:(response) => {
        this.message = response;
        this.router.navigate(['/account'])
      },
      error: (error) => this.message = error,
    });
  }

}

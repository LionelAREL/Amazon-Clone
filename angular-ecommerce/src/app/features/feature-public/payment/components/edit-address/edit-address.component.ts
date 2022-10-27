import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {

  constructor(private fetchData:FetchDataService) { }

  formAdresses:any = new FormGroup([]);

  selectedAdresse:any = undefined;

  adresses:any[] = []

  ngOnInit(): void {
    this.getAdresses()

  }

  getAdresses(){
    this.fetchData.addresses().subscribe((adresses:any) => {
        this.adresses = adresses;
        console.log(adresses)
        this.setFormArray();
    })
  }

  setFormArray(){
    for(let adresse of this.adresses){
      this.formAdresses.addControl(adresse.id,new FormControl(adresse.id.toString(),[Validators.required]))
    }
    console.log(this.formAdresses)
  }

  onRadioChange(adress:any){
    console.log(adress)
    this.selectedAdresse = adress;
  }

  submitAdresse(){
    console.log("123");
    if(this.selectedAdresse != undefined){
      this.fetchData.postSelectedAddress(this.selectedAdresse).subscribe({
        next:(message) => {
          console.log(message)
          // this.router.navigate([this.authService.redirectUrl != "" ? this.authService.redirectUrl : '/home']);
        },
        error:(messageError) => {
          console.log(messageError)
        },
      })
    }
  }
}

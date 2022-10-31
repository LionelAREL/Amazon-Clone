import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {

  constructor(private fetchData:FetchDataService,private router:Router) { }

  formAdresses:any = new FormGroup([]);

  selectedAdresse:any = undefined;

  adresses:any[] = []

  @Output() showFirstEvent = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.getAdresses()

  }

  getAdresses(){
    this.fetchData.addresses().subscribe((adresses:any) => {
        this.adresses = adresses;
        console.log(adresses)
        this.setFormArray();
        this.selectedAdresse = this.adresses.find((adress) => adress.default === true)
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
    if(this.selectedAdresse != undefined){
      this.fetchData.postSelectedAddress(this.selectedAdresse).subscribe({
        next:(message) => {
          console.log(message)
          this.showFirstEvent.emit(true);
        },
        error:(messageError) => {
          console.log(messageError)
        },
      })
    }
  }
}

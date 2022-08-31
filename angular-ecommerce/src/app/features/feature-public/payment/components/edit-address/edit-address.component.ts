import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.sass']
})
export class EditAddressComponent implements OnInit {

  expanded:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  expand(){
    this.expanded = !this.expanded;
  }

}

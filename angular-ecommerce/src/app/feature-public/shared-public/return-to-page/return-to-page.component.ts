import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-return-to-page',
  templateUrl: './return-to-page.component.html',
  styleUrls: ['./return-to-page.component.scss']
})
export class ReturnToPageComponent implements OnInit {

  @Input() transitionPage:string = "";
  @Input() transitionPageName:string = "";
  @Input() currentPage:string = "";

  constructor() { }

  ngOnInit(): void {
  }

}

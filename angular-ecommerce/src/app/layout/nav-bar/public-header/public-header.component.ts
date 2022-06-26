import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { EventService } from 'src/app/core/service/event.service';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.sass']
})
export class PublicHeaderComponent implements OnInit {

  logoutMessage:string = ""; 
  cartNumber:Number = 0;
  address:string = "";
  constructor(private authService:AuthService, private router: Router,private eventService:EventService) { }

  ngOnInit(): void {
    this.getSession();
    this.eventService.eventSubject.subscribe((event)=>{
      this.getSession();
    })
  }


  getSession(){
    this.authService.session().subscribe({
      next:(session) => {
        this.cartNumber = session.cartNumber;
        this.address = session.address?.city
      },
      error:(error) => {},
    });
  }


  logout(){
    this.authService.logout().subscribe({
      next:(message) => {
        this.logoutMessage = message;
        this.authService.isLogged = false;
        this.eventService.emmitEvent({name:"logoutSucceed"})
      },
      error:(message) => this.logoutMessage = message
    })
  }

  submit(event:any,input:any){
    event.preventDefault();
    this.eventService.emmitEvent({name:"searchEmmit"})
    this.router.navigate(['/product-list'],{ queryParams: { 'page': 1,'search':input.value}})
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { EventService } from 'src/app/core/service/event.service';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.scss']
})
export class PublicHeaderComponent implements OnInit {

  logoutMessage:string = ""; 
  cartNumber:Number = 0;
  address:string = "";
  name:string ="";
  categories:any;
  selectedCategory:string = "";

  constructor(private authService:AuthService, private router: Router,private eventService:EventService,private fetchData:FetchDataService) { }

  ngOnInit(): void {
    this.getSession();
    this.eventService.eventSubject.subscribe((event)=>{
      this.getSession();
    })
    this.getCategories();
  }


  getSession(){
    this.authService.session().subscribe({
      next:(session) => {
        console.log(session)
        this.cartNumber = session.cartNumber;
        this.address = session.address?.city
        this.name = session?.user?.name;
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

    this.router.navigate(['/product-list'],{ queryParams: { 'page': 1,'search':input.value,...( this.selectedCategory !== '' &&{'category':this.selectedCategory})}})
  }

  getCategories(){
    this.fetchData.categories().subscribe({
      next:(categories) => {
        this.categories = categories
        console.log(categories)
      },
      error:(message) => this.logoutMessage = message
    })
  }

  changeCategory(category:any){
    this.selectedCategory=category.target.value;
    console.log(category.target.value)
  }


}

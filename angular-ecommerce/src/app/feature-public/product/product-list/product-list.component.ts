import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import { EventService } from 'src/app/core/service/event.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products:any[] = [];
  messageError:string = "";
  numberChoice:number[] = []

  constructor(private fetchData:FetchDataService,private route: ActivatedRoute, private router: Router,private eventService:EventService) {}

  ngOnInit(): void {
    if(this.route.snapshot.queryParams['page']){
      this.config.currentPage = Number(this.route.snapshot.queryParams['page']);
    }
    else{
      this.config.currentPage = 1;
    }

    this.route.queryParams.subscribe({ 
        next: (params:any) => {
          console.log(params);
          this.getProducts(params);
        }
    });

    for(let i = 2;i<11;i++){
      this.numberChoice.push(i);
    }
  }

  public filter: string = '';
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = true;
  public responsive: boolean = true;
  public config: any = {
      id: 'advanced',
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0,
  };
  public labels: any = {
      previousLabel: 'Previous',
      nextLabel: 'Next',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  public eventLog: string[] = [];

  onPageChange(number: number) {
      this.config.currentPage = number;
      this.router.navigate(['/product-list'], {queryParams: {page:number},queryParamsHandling: "merge" });
  }

  onPageBoundsCorrection(number: number) {
      this.config.currentPage = number;
  }

  getProducts(params:any){
    this.fetchData.products(params).subscribe({
      next:(products:any) => {
        this.products = products.results;
        this.config.totalItems = products.count;
        this.config.currentPage = params.page
        console.log(products)
      },
      error:(error) => {
        console.log(error)
        this.messageError = error;
      }
    });
  }

  addToCart(productId:any,quantity:any){
    if(productId != null){
      this.fetchData.addToCart(productId,quantity,false).subscribe({
        next:(detail) => {console.log(detail);this.eventService.emmitEvent({name:"addToCart"})},
        error:(error) => console.log(error),
      })
    }
  }

}

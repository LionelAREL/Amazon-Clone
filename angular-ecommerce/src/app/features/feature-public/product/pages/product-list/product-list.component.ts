import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import { EventService } from 'src/app/core/service/event.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

  products:any[] = [];
  search:string = "";
  messageError:string = "";

  constructor(private fetchData:FetchDataService,private route: ActivatedRoute, private router: Router,private eventService:EventService) {}

  ngOnInit(): void {
    if(this.route.snapshot.queryParams['page']){
      this.config.currentPage = Number(this.route.snapshot.queryParams['page']);
    }
    else{
      this.config.currentPage = 1;
    }
    this.getProducts(this.config.currentPage);

    this.eventService.event("searchEmmit").subscribe((event)=>{
      this.config.currentPage = 1;
      this.getProducts(this.config.currentPage);
    })
  }

  public filter: string = '';
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = true;
  public responsive: boolean = true;
  public config: any = {
      id: 'advanced',
      itemsPerPage: 1,
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
      this.router.navigate(['/product-list'], {queryParams: {page:number}});
      this.getProducts(number);
  }

  onPageBoundsCorrection(number: number) {
      this.config.currentPage = number;
      console.log(number);
  }

  getProducts(pageNumber:number){
    this.fetchData.products(pageNumber).subscribe({
      next:(products:any) => {
        this.products = products.results;
        this.config.totalItems = products.count;
      },
      error:(error) => {
        console.log(error)
        this.messageError = error;
      }
    });
  }

}

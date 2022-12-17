import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { log, handleErrorMessage, handleError } from '../utils/auth.utils';
import { CookieService } from 'ngx-cookie';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  BASE_URL = environment.baseUrl + "api/";


  constructor(private http: HttpClient,private cookieService: CookieService,private eventService:EventService) { }

  getHeader(){
    return {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'X-csrfToken':this.cookieService.get("csrftoken") as any,
     }),
      withCredentials:true,
    };
  }


  cart(){
    return this.http.get(this.BASE_URL + "cart/",{withCredentials:true}).pipe(
    catchError(handleErrorMessage<any>('cart')),
    );
  }

  products(params:any){
    let queryParams = "";
    for(let key in params){
      queryParams += queryParams.includes("?") ? `&${key}=${params[key]}` : `?${key}=${params[key]}`
    }
    return this.http.get(this.BASE_URL + "product/" + queryParams,{withCredentials:true}).pipe(
      catchError(handleErrorMessage<any>('product')),
      );
  }
  product(id:string){
    return this.http.get(this.BASE_URL + `product/${id}/` ,{withCredentials:true}).pipe(
      catchError(handleErrorMessage<any>('product')),
      );
  }

  addresses(){
    return this.http.get(this.BASE_URL + "address/",this.getHeader()).pipe(
      catchError(handleErrorMessage<any>('address')),
      );
  }
  categories(){
    return this.http.get(this.BASE_URL + "category/",this.getHeader()).pipe(
      catchError(handleErrorMessage<any>('category')),
      );
  }
  ordered(){
    return this.http.get(this.BASE_URL + "order/",this.getHeader()).pipe(
      
      catchError(handleErrorMessage<any>('order')),
      );
  }

  postAddress(address:any){
    return this.http.post(this.BASE_URL + "address/",address,this.getHeader()).pipe(
      tap((data) => log(data)),
      map((data:any) => data.detail),
      catchError(handleErrorMessage<any>('address')),
      );
  }
  postSelectedAddress(address:any){
    return this.http.post(this.BASE_URL + "selected-address/",{"id":address.id.toString()},this.getHeader()).pipe(
      tap((data) => log(data)),
      map((data:any) => data.detail),
      catchError(handleErrorMessage<any>('address')),
      );
  }

  user(){
    return this.http.get(this.BASE_URL + "user/",{withCredentials:true}).pipe(
      catchError(handleError<any>('session',null)),
    );
  }

  putUser(user:any){
    return this.http.put(this.BASE_URL + "user/",user,this.getHeader()).pipe(
      tap((data) => log(data)),
      map((data:any) => data.detail),
      catchError(handleErrorMessage<any>('user')),
      );
  }

  stripeUrl(){
    return this.http.get(this.BASE_URL + "payment/",{withCredentials:true}).pipe(
      catchError(handleErrorMessage<any>('payment')),
    );
  }

  addToCart(productId:string,quantity:number,add:boolean){
    return this.http.post(this.BASE_URL + "cart/?add=" + (add ? "true" : "false"),{product:productId,quantity:quantity},this.getHeader()).pipe(
      tap((data:any) => {
        console.log("data",data);
        this.eventService.emmitEvent({name:"add-to-cart-success",details:data,add,quantity});
      }),
      catchError(handleErrorMessage<any>('cart')),
      );
  }

  deleteAdresse(id:string){
    return this.http.delete(this.BASE_URL + "address/" + id + "/",this.getHeader()).pipe(
      tap((data) => log(data)),
      map((data:any) => data.detail),
      catchError(handleErrorMessage<any>('delete')),
      );
  }
}

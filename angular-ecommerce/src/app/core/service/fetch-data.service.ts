import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { log, handleErrorMessage, handleError } from '../utils/auth.utils';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  BASE_URL = environment.baseUrl + "api/";

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'X-csrfToken':this.cookieService.get("csrftoken") as any,
   }),
    withCredentials:true,
  };

  constructor(private http: HttpClient,private cookieService: CookieService) { }

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

  addresses(){
    return this.http.get(this.BASE_URL + "address/",this.httpOptions).pipe(
      catchError(handleErrorMessage<any>('address')),
      );
  }

  postAddress(address:any){
    return this.http.post(this.BASE_URL + "address/",address,this.httpOptions).pipe(
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
    return this.http.put(this.BASE_URL + "user/",user,this.httpOptions).pipe(
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
}

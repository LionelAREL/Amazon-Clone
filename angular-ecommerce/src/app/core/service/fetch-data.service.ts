import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable, of, throwError } from 'rxjs';
import {retry, map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { log, handleErrorMessage, handleError} from '../utils/auth.utils';


@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  BASE_URL = environment.baseUrl + "api/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  cart(){
    return this.http.get(this.BASE_URL + "cart/",{withCredentials:true}).pipe(
    catchError(handleErrorMessage<any>('cart')),
    );
  }

  products(pageNumber:number){
    return this.http.get(this.BASE_URL + "product/?page=" + pageNumber,{withCredentials:true}).pipe(
      catchError(handleErrorMessage<any>('product')),
      );
  }

}

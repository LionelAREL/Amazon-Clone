import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { log, handleErrorMessage, handleError} from '../utils/auth.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = environment.baseUrl + "auth/";

  isLogged = false;

  redirectUrl = "";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
    withCredentials:true,
  };

  constructor(private http:HttpClient) { 
    this.refreshSession();
  }

  login(username:any,password:any):Observable<any>{
    return this.http.post(this.BASE_URL + "login/",{'username':username,'password':password},this.httpOptions).pipe(
      tap((data) => log(data)),
      map((data:any) => data.detail),
      catchError(handleErrorMessage<any>('login')),
    );
}

  logout(){
    return this.http.get(this.BASE_URL + "logout/",{withCredentials:true}).pipe(
      map((data:any) => data.detail),
      catchError(handleErrorMessage<any>('logout')),
    );
  }

  tokenCRSF(){
    return this.http.get(this.BASE_URL + "tokenCSRF/",{withCredentials:true}).pipe(
      tap((data:any) => log(data.success)),
      catchError(handleErrorMessage<any>('tokenCRSF')),
    );
  }

  session(){
    return this.http.get(this.BASE_URL + "session/",{withCredentials:true}).pipe(
      catchError(handleError<any>('session',{user:null})),
    );
  }

  register(user:any){
    return this.http.post(this.BASE_URL + "register/",user,this.httpOptions).pipe(
      tap((data) => log(data)),
      map((data:any) => data.detail),
      catchError(handleErrorMessage<any>('register')),
    );
  }

  refreshSession(){
    this.session().subscribe((session) => {
      if(session.user != null){
        this.isLogged = true;
      }
      else{
        this.isLogged = false;
      }
    });
  }
}

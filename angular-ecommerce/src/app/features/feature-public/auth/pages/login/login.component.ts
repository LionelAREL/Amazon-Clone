import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { EventService } from 'src/app/core/service/event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  message:string = "";
  resetMessage:boolean = false;

  constructor(private authService:AuthService, private router: Router,private eventService:EventService) { }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    this;this.authService.tokenCRSF().subscribe();
  }

  onChange(){
    this.message = "";
  }

  onSubmit():void{
    this.resetMessage = true;
    console.log(this.loginForm.value.username,this.loginForm.value.password);
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    this.authService.login(username,password).subscribe({
      next:(message) => {
        this.message = message;
        this.authService.isLogged = true;
        this.eventService.emmitEvent({name:"loginSucceed"})
        this.router.navigate([this.authService.redirectUrl != "" ? this.authService.redirectUrl : '/home']);
      },
      error:(messageError) => {
        this.message = messageError;
      },
    });
  }

}

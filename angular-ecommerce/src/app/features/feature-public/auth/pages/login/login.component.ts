import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { EventService } from 'src/app/core/service/event.service';

type Step = 'emailInfo' | 'passwordInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  message:string = "";
  resetMessage:boolean = false;
  setError:boolean = false;

  constructor(private authService:AuthService, private router: Router,private eventService:EventService) { }

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

  currentStep: string = 'emailInfo';
  
  ngOnInit(): void {
    this.authService.tokenCRSF().subscribe();
    console.log(this.loginForm)
  }

  onChange(){
    this.message = "";
  }

  onSubmit():void{
    this.resetMessage = true;
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    if(this.loginForm.valid){
      this.authService.login(email,password).subscribe({
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

  changeStep(e:Event,direction:boolean) {
    e.preventDefault();
    switch(this.currentStep) {
      case 'emailInfo':
        if (direction && this.loginForm.controls.email.errors == null) {
          this.currentStep = 'passwordInfo';
          this.setError = false
        }
        else{
          this.setError = true
        }
        break;
        case 'passwordInfo':
          if (!direction) {
            this.currentStep = 'emailInfo';
            this.setError = false
          }
          else{
            this.setError = true
          }
        break;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatchPasswordValidators } from './matchPasswordValidator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  message:string = "";
  setError:boolean = false;


  registerForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
    rePassword: new FormControl('',[Validators.required]),
  },[MatchPasswordValidators.MatchValidator('password', 'rePassword')]);

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    this.setError = true;
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe({
        next:(message) => {
          this.message = message;
          this.router.navigate(['/']);
        },
        error:(messageError) => {
          this.message = messageError;
        },
      })
    }
    else{

    }
  }

}

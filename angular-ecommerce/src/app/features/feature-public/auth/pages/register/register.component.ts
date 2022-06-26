import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { EventService } from 'src/app/core/service/event.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  message:string = "";

  registerForm = new FormGroup({
    username: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService:AuthService,private router:Router,private eventService:EventService) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    this.authService.register(this.registerForm.value).subscribe({
      next:(message) => {
        this.message = message;
        this.eventService.emmitEvent({name:"registerSucceed"})
        this.router.navigate(['/register']);
      },
      error:(messageError) => {
        this.message = messageError;
      },
  })
  }

}

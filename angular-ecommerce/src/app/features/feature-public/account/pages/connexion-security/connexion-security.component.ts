import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';
import { MatchPasswordValidators } from './matchPasswordValidator';

@Component({
  selector: 'app-connexion-security',
  templateUrl: './connexion-security.component.html',
  styleUrls: ['./connexion-security.component.scss']
})
export class ConnexionSecurityComponent implements OnInit {

  showName:boolean = false;
  showEmail:boolean = false;
  showPassword:boolean = false;

  showError:boolean = false;

  name:string = "";
  email:string = "";
  
  message:string = "";

  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    checkPassword: new FormControl(''),
    },[MatchPasswordValidators.MatchValidator('password','checkPassword')]);

  constructor(private fetchData:FetchDataService,private router:Router) { }

  ngOnInit(): void {
    this.fetchData.user().subscribe({
      next:(user) => {
        this.userForm.patchValue(user);
        this.name = user.name;
        this.email = user.email;
      },
    });
  }

  submit(){
    if(this.userForm.valid){
      this.fetchData.putUser(this.userForm.value).subscribe({
        next:(response) => {
          this.message = response;
          window.location.reload();
        },
        error:(error) => {
          this.message = error;
        }
      });
    }
    else{
      this.showError = true;
    }
  }

  setShowName(){
    this.showName = !this.showName;
  }
  setShowEmail(){
    this.showEmail = !this.showEmail;
  }
  setShowPassword(){
    this.showPassword = !this.showPassword;
  }

}

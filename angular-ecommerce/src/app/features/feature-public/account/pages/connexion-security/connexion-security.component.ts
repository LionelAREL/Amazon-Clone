import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FetchDataService } from 'src/app/core/service/fetch-data.service';

@Component({
  selector: 'app-connexion-security',
  templateUrl: './connexion-security.component.html',
  styleUrls: ['./connexion-security.component.sass']
})
export class ConnexionSecurityComponent implements OnInit {

  message:string = "";

  userForm = new FormGroup({
    username: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    });

  constructor(private fetchData:FetchDataService) { }

  ngOnInit(): void {
    this.fetchData.user().subscribe({
      next:(user) => {
        this.userForm.patchValue(user);
      },
    });
  }

  submit(){
    this.fetchData.putUser(this.userForm.value).subscribe({
      next:(response) => {
        this.message = response;
      },
      error:(error) => {
        this.message = error;
      }
    });
  }

}

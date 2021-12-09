import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from 'src/app/products/shared/services/products.service';
import { User } from '../../models/user';
import { AuthService } from 'src/app/products/shared/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'ed-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent{

  users: User[];
  validFlag: Boolean;
  // Inicializamos un form gruoup con los campos
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password : new FormControl('')
  }); 

public id;

  constructor(private router: Router,
              private service:ProductsService,
              private authService:AuthService){

  }

  submit(){
    // Revisamos si es consistente o no
    if(this.form.valid){
      this.validateLogin(this.form.value);
    }
  }

  private validateLogin(user: User){

    this.authService.login(user.username, user.password).pipe(first()).subscribe(
      data => {
        console.log(data)
      }
    )
  }
}

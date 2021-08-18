import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from 'src/app/products/shared/services/products.service';
import { User } from '../../models/user';

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
    password: new FormControl('')
  }); 

public id;

  constructor(private router: Router,
              private service:ProductsService){

  }

  submit(){
    // Revisamos si es consistente o no
    if(this.form.valid){
      this.validateLogin(this.form.value);
    }
  }

  private validateLogin(user: User){

    this.service.getAllUsers()
    .subscribe(data => {
      this.users = data;
      
      data.forEach(element => {
        //console.log(element.username);
        if(user.username === element.username ){
          if (user.password === element.password)
            this.router.navigate(['']);
            this.id = element.id;
          
          //console.log(element.password);
          
        }else{
          this.validFlag = false;
          console.log("fallo alv");
          
        }
      });
    });
  }
}

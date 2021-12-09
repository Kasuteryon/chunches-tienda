import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { ProductsService } from 'src/app/products/shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ed-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password : new FormControl(''),
    
  });

  birth: FormGroup = new FormGroup({
    birthDate: new FormControl('')
  });

  constructor(private router: Router,
              private service:ProductsService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.form.valid){
      this.Register();
    }
  }

  private Register(){
    const USER = this.form.value;
      this.service.addUser(USER)
        .subscribe(result =>{
          this.router.navigate(['login']);
          this.snackBar.open('Usuario Registrado', 'Cerrar',{
            duration: 3000 //milisegundos
          })
      });
    
  }

  calcularEdad(){
    if (this.birth.value.birthDate){
      const convertAge = new Date(this.birth.value.birthDate);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      return Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }

  }
}

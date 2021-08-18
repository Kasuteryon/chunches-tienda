import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'ed-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    brand:new FormControl(''),
    description:new FormControl(''),
    status:new FormControl(''),
    thumbImage:new FormControl(''),
    userId: new FormControl('1')
  });

  constructor(private service:ProductsService,
              private route:Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  submit(){
    if (this.form.valid){
      const PRODUCT = this.form.value;

      this.service.add(PRODUCT)
        .subscribe(result =>{
          this.route.navigate(['']);
          this.snackBar.open('Artículo Añadido', 'Cerrar',{
            duration: 3000 //milisegundos
          })
      });
          
    }
    else{
      console.log('form invalido');
    }
  }

  cancel(){
    this.route.navigate(['']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductsService } from '../shared/services/products.service';
import { Categories } from '../shared/models/categories';

@Component({
  selector: 'ed-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  img = '';
  form: FormGroup = new FormGroup({
    titulo:new FormControl(''),
    marca:new FormControl(''),
    descripcion:new FormControl(''),
    estado:new FormControl(''),
    imagen:new FormControl(this.img),
    vigente:new FormControl(true),
    idcategoria:new FormControl(''),
    idusuario:new FormControl(''),
    identrega: new FormControl(1)
  });

  categories: Categories[];
  
  
  constructor(private service:ProductsService,
              private route:Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  submit(){
    if (this.form.valid){
      const PRODUCT = this.form.value;
      console.log(this.form.value)
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

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0].name;
      
      this.img = file;

      console.log(this.img)
    }
      
  }


  private loadCategories(){
    this.service.getCat()
    .subscribe(data => {
      this.categories = data;
      //console.log(data)
    });
  }

  cancel(){
    this.route.navigate(['']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../shared/services/products.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ed-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    brand: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
    thumbImage: new FormControl(''),
    userId: new FormControl('1')
  });
  

  id: string;
  constructor(private route:ActivatedRoute,
              private service:ProductsService,
              private router:Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.get(this.id)
      .subscribe(product =>{
        // Con el patch value el encuentra solo las propiedades que hagan match

        this.form.patchValue(product)
      });
  }

  submit(){
    if (this.form.valid){
      const product = this.form.value;
      product.id = this.id;
      this.service.update(product)
        .subscribe();
        this.router.navigate(['']);
        this.snackBar.open('Artículo Actualizado', 'Cerrar',{duration: 3000});
    }
  }

  cancel(){
    this.router.navigate(['']);
  }

}

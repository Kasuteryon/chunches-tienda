import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductsService } from '../shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Coments } from '../shared/models/coments';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ed-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products: Product;
  coments: Coments[];
  id;
  user = JSON.parse(localStorage.getItem('currentUser'));
  iduser = this.user.user_id;
  @Input() userid:string = this.iduser;

  form: FormGroup = new FormGroup({
    comentario:new FormControl(''),
    idproducto:new FormControl(''),
    iduser: new FormControl(''),
    fecha: new FormControl('')
  });
  constructor(private service: ProductsService,
              private route: ActivatedRoute,
              private route2: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadProduct();
    this.loadComments();
  }

  private loadProduct(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.get(this.id)
      .subscribe(product =>{
        // Con el patch value el encuentra solo las propiedades que hagan match
        
        this.products = product;
      });
  }

  @ViewChild('comentario') com;

  submit(){
    if (this.form.valid){
      const date: Date = new Date();

      this.form.value.idproducto = this.id;
      this.form.value.iduser = this.iduser;
      this.form.value.fecha = date;
      const COMENT = this.form.value;

      console.log(this.form.value.idproducto)

      console.log(COMENT)

      this.service.addComent(COMENT).subscribe(result => {
        this.route2.navigate(['/products', 'detail', this.id]);
        this.snackBar.open('Comentario Añadido', 'Cerrar', {
          duration: 3000
        })

      });

      this.form.reset();
    }
  }

  private loadComments(){

    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getComent(this.id)
      .subscribe(coment => {
        
        //let id = parseInt(coment["iduser"])

        // coment["iduser"] = this.loadName(id)
        this.coments = coment;

        
        this.coments.forEach(element => {
          let id = parseInt(element.iduser);
          this.service.getUser(id)
            .subscribe(user => {
              element.iduser = `${user.first_name} ${user.last_name}`
              
          });
          //element.iduser = this.loadName(id);
          
        });
      });

     
  }


}

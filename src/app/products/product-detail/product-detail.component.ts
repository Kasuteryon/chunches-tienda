import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductsService } from '../shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Coments } from '../shared/models/coments';

@Component({
  selector: 'ed-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products: Product;
  coments: Coments[];
  id;

  form: FormGroup = new FormGroup({
    mensaje:new FormControl('')
  });
  constructor(private service: ProductsService,
              private route: ActivatedRoute) { }

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

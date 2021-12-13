import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductsService } from '../shared/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ed-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products: Product;
  id;
  constructor(private service: ProductsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  private loadProduct(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.get(this.id)
      .subscribe(product =>{
        // Con el patch value el encuentra solo las propiedades que hagan match
        
        this.products = product;
      });
  }
}

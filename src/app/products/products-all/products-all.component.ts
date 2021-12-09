import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductsService } from '../shared/services/products.service';


@Component({
  selector: 'ed-products-all',
  templateUrl: './products-all.component.html',
  styleUrls: ['./products-all.component.css']
})
export class ProductsAllComponent implements OnInit {

  searchText = '';
  products:Product[];
  constructor(private service:ProductsService) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  private loadProduct(){
    this.service.getAll()
    .subscribe(data => {
      this.products = data;
      console.log(data)
    });
  }

  time(){
    setTimeout(function () {
      this.products.forEach(product => {
        
      });
      return false;
    }, 1500);
    
  }

  //n = setTimeout(function () { /* snip */  }, 1500);

}

import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductsService } from '../shared/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ed-products-all',
  templateUrl: './products-all.component.html',
  styleUrls: ['./products-all.component.css']
})
export class ProductsAllComponent implements OnInit {

  searchText = '';
  products:Product[];
  user = JSON.parse(localStorage.getItem('currentUser'));
  @Input() iduser = this.user.user_id;

  constructor(private service:ProductsService,
              private router:Router) { }

  ngOnInit(): void {
    this.validateSession();
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

  validateSession(){
    if (localStorage.getItem('currentUser') == null){
      this.router.navigate(['login']);
    }
  }
  //n = setTimeout(function () { /* snip */  }, 1500);

}

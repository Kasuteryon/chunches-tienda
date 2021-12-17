import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'ed-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {

    window.addEventListener('DOMContentLoaded', () => {
      this.validateSession();
    });
  }

  validateSession(){
    if (localStorage.getItem('currentUser') == null){
      this.router.navigate(['login']);
    }
  }
}

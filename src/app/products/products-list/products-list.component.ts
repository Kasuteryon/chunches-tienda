import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { Product } from '../shared/models/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';

@Component({
  selector: 'ed-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  
  user = JSON.parse(localStorage.getItem('currentUser'));
  @Input() iduser:string = this.user.user_id;
  products: Product[];  

  constructor(private service: ProductsService,
              private snackBar:MatSnackBar,
              private router:Router,
              private dialog:MatDialog) { }
  
  ngOnInit(): void {
    this.loadProduct();
  }

  delete(product:Product){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar Producto',
        message: '¿Seguro que desea eliminarlo?'
      }                   
    });

    dialogRef.afterClosed()
      .subscribe(result =>{
        if (result){
          this.deleteProduct(product)
        }
      });
  }

  private loadProduct(){
    this.service.getAll()
    .subscribe(data => {
      this.products = data;
      console.log(this.products)
    });
  }

  private deleteProduct(product){
    this.service.delete(product.idproducto).subscribe(response =>{
      this.loadProduct();
      this.snackBar.open('Artículo Eliminado', 'Cerrar', {duration:3000});
      this.router.navigate(['']);
      }
    );
  }

}

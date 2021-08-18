import { Component, OnInit } from '@angular/core';
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
    });
  }

  private deleteProduct(product: Product){
    this.service.delete(product.id).subscribe(response =>{
      this.loadProduct();
      this.snackBar.open('Artículo Eliminado', 'Cerrar', {duration:3000});
      this.router.navigate(['']);
      }
    );
  }

}

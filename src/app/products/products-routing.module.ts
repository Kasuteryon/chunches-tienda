import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductsAllComponent } from './products-all/products-all.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsComponent } from './products.component';


const routes: Routes = [
  {
    path:'', // Si esta vacío el contexto siempre sera products
    component: ProductsComponent,
    children: [
      // Si cargamos productos redirecciona a products/list
      {path:'', pathMatch:'full', redirectTo:'all'},
      {path:'all', component:ProductsAllComponent},
      {path:'list/:id', component: ProductsListComponent},
      {path:'add', component:ProductAddComponent},
      {path:'edit/:id', component:ProductEditComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class ProductsRoutingModule { }

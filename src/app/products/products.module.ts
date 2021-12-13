import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { MaterialModule } from '../shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductAddComponent } from './product-add/product-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductsAllComponent } from './products-all/products-all.component';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [ProductsComponent, ProductsListComponent, ProductAddComponent, ProductEditComponent, ProductsAllComponent,
  FilterPipe,
  ProductDetailComponent,
  ProfileComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class ProductsModule { }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { Product } from '../models/product';

const PRODUCTS_URL = 'http://192.168.1.8:3000/products';
const USERS_URL = 'http://192.168.1.8:3000/users';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${PRODUCTS_URL}`);
  }

  add(product: Product):Observable<Product>{
    return this.httpClient.post<Product>(`${PRODUCTS_URL}`, product);
  }
  
  get(id: string): Observable<Product>{
    return this.httpClient.get<Product>(`${PRODUCTS_URL}/${id}`);
  }

  update(product: Product): Observable<Product>{
    return this.httpClient.put<Product>(`${PRODUCTS_URL}/${product.id}`, product);
  }

  delete(id:string): Observable<Product>{
    return this.httpClient.delete<Product>(`${PRODUCTS_URL}/${id}`);
  }

  // On users
  addUser(user: User):Observable<User>{
    return this.httpClient.post<User>(`${USERS_URL}`, user);
  }
  getAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${USERS_URL}`);
  }
}

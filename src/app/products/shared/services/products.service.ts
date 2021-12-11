import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { Product } from '../models/product';
import { Categories } from '../models/categories';

//const PRODUCTS_URL = 'http://192.168.1.8:3000/products';
//const USERS_URL = 'http://192.168.1.8:3000/users';

const PRODUCTS_URL = 'http://localhost:3000/products';
const USERS_URL = 'http://localhost:3000/users';

const USER = 'http://192.168.1.12:8000/api/users/'
const PRODUCT = 'http://192.168.1.12:8000/api/products/'
const CAT = 'http://192.168.1.12:8000/api/categories/'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${PRODUCT}`);
  }

  getCat(): Observable<Categories[]>{
    return this.httpClient.get<Categories[]>(`${CAT}`);
  }

  add(product: Product):Observable<Product>{
    return this.httpClient.post<Product>(`${PRODUCT}`, product);
  }
  
  get(id: string): Observable<Product>{
    return this.httpClient.get<Product>(`${PRODUCT}${id}`);
  }

  update(product: Product): Observable<Product>{
    return this.httpClient.put<Product>(`${PRODUCT}${product.id}/`, product);
  }

  delete(id:string): Observable<Product>{
    return this.httpClient.delete<Product>(`${PRODUCT}${id}`);
  }

  // On users
  addUser(user: User):Observable<User>{
    return this.httpClient.post<User>(`${USER}`, user);
  }
  getAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${USER}`);
  }
}

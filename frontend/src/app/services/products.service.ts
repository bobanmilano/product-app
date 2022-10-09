import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Product } from '../models/product';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  getProducts(): Observable<any> {
    let url = baseUrl + '/products';
    
    let options = { headers:  new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`
    }) };
  
    return this.http.get<Product[]>(url, options);
  }

  addProduct(product: Product): Observable<Product> {
    let url = baseUrl + '/products';
    const headers = { 'content-type': 'application/json' };  
    const body=JSON.stringify(product);

    return this.http.post<any>(url,body, {'headers': headers});
  }

  updateProduct(product: Product): Observable<Product> {
    let url = baseUrl + '/products/' + product.id;
    const headers = { 'content-type': 'application/json' };  
    const body=JSON.stringify(product);

    return this.http.patch<any>(url,body, {'headers': headers});
  }

  deleteProduct(product: Product) {
    let url = baseUrl + '/products/' + product.id;

   return this.http.delete<Product>(url);
  }

}

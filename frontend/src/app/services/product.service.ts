import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductDto } from '../models/dto/create-product-dto';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = baseUrl + "/products";

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      tap(_ => this.log('getProducts')),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + '/' + id).pipe(
      tap(_ => this.log(`getProduct id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.patch(this.url + "/" + product.id, product).pipe(
      tap(_ => this.log(`updateProduct id=${product.id}`)),
      catchError(this.handleError<any>(`updateProduct id=${product.id}`))
    );
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(this.url + "/" + productId).pipe(
      tap(_ => this.log(`deleteProduct id=${productId}`)),
      catchError(this.handleError<Product>('deleteProduct - id:' + productId))
    );
  }

  addProduct(product: ProductDto): Observable<Product> {
    const headers = { 'content-type': 'application/json' };  
    return this.http.post<any>(this.url, product, {'headers': headers}).pipe(
      tap((newProduct: Product) => this.log(`addProduct w/ name=${newProduct.name}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Product[]>(`${this.url}/search/${term}`).pipe(
      tap(x => x.length ?
        this.log(`products found matching "${term}"`) :
        this.log(`no products matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchProducts', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

   private log(message: string) {
    this.messageService.add("[" + new Date().toString() + "]" + ` -- ProductService -- ${message}`);
  }
  
}

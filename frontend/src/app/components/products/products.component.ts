import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MessageService } from 'src/app/services/message.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductDto } from 'src/app/models/dto/create-product-dto';
import { Product } from 'src/app/models/product';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { defaultMaxListeners } from 'events';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  newProduct = {} as Product;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
        .subscribe(result => this.products = result);
  }

  delete(product: Product) {
    this.products = this.products.filter(h => h !== product);
    this.productService.deleteProduct(product.id).subscribe();
  }

  add(): void {
    if (!this.newProduct) { return; }

    let product: ProductDto  = {
      name: this.newProduct.name,
      description: this.newProduct.description,
      category: this.newProduct.category,
      price: this.newProduct.price,
      inStock: this.newProduct.inStock
    }

    this.productService.addProduct(product)
      .subscribe(product => {
        this.products.push(product);
      });
  }

  getDescription(description: string) {
    if ( description.length < 100) 
      return description;
    
    return description.slice(0, 100) + " ...";
  }

}

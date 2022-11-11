import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/models/dto/create-product-dto';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  newProduct = {} as Product;
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  } 

  addNewProduct(newProduct: ProductDto): void {
    if (!this.newProduct) { return; }

    this.productService.addProduct(newProduct)
      .subscribe(product => {
        this.products.push(product);
      });
  }

}
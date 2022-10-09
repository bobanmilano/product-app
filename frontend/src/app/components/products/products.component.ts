import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UiService } from 'src/app/services/ui.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  product?: Product;
  showAddProduct: boolean = false;
  subscription: Subscription | undefined;

  constructor(private productService: ProductsService, private uiService: UiService) { 
    this.subscription = this.uiService.onToggle().subscribe((value) => this.showAddProduct = value);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((result) => this.products = result);
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product)
      .subscribe(() => (this.products = this.products.filter(t => t.id !== product.id)));
  }

  editProduct(product: Product) {    
    this.product = product;    
    this.showAddProduct = true;
  }
  
  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe((product) => {
      this.products.push(product);
      location.reload();
    });
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe((product) => {
      const indexOfProduct = this.products.findIndex(
        (item) => item.id === product.id
      )
      this.products[indexOfProduct] = product;

    });
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product';
import { ProductDto } from 'src/app/models/dto/create-product-dto';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  editMode: false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id)
      .subscribe((result) => {
        this.product = result
      });
  }

  update(product: ProductDto): void {
      console.log("product detail - updating: ");
      console.log(product);
      this.productService.updateProduct(product)
      .subscribe(() =>  this.router.navigate(["products"]));
  }

}

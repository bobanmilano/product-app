import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  editMode: false;

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  productForm = this.fb.group({
    name: ['', Validators.required],
    description:  ['', Validators.required],
    price:  ['', Validators.required],
    inStock:  ['', Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id)
      .subscribe((result) => {
        this.product = result, 
        this.setProduct()
      });
  }

  setProduct() {
    this.productForm.setValue(
      {
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        inStock: this.product.inStock
      }
    )
  }

  save(): void {
    if (this.product) {
      this.product.name = this.productForm.controls["name"].value;
      this.product.description = this.productForm.controls["description"].value;
      this.product.price = this.productForm.controls["price"].value;
      this.product.inStock = this.productForm.controls["inStock"].value;

      this.productService.updateProduct(this.product)
        .subscribe(() =>  this.router.navigate(["products"]));
    }
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    console.warn(this.productForm.value);
    this.save();
  }

}

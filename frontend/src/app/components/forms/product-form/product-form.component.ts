import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductDto } from 'src/app/models/dto/create-product-dto';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class FormComponent implements OnInit {
  @Output() newProductEvent = new EventEmitter<ProductDto>();
  @Output() updateProductEvent = new EventEmitter<ProductDto>();
  @Output() hideFormEvent = new EventEmitter<boolean>();
  @Input() product?: Product; 

  productForm = this.fb.group({
    name: ['', Validators.required],
    description:  ['', Validators.required],
    price:  ['', Validators.required],
    inStock:  ['']
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];

      if(chng.currentValue !== undefined) 
      {    
        this.setProduct(chng.currentValue);
      };
    }
  }

  addNewProduct(product: ProductDto) {
    this.newProductEvent.emit(product);
  }

  setProduct(cur: Product) {
    this.productForm.setValue(
      {
        name: cur.name,
        description: cur.description,
        price: cur.price,
        inStock: cur.inStock
      }
    )
  }
  
  onSubmit() {
    if(this.product?.id) {
      var prodDto =  new ProductDto();
        prodDto.id = this.product?.id,
        prodDto.name = this.productForm.controls["name"].value,
        prodDto.description = this.productForm.controls["description"].value,
        prodDto.price = this.productForm.controls["price"].value,
        prodDto.inStock = this.productForm.controls["inStock"].value
      
        this.updateProductEvent.emit(prodDto);
    } else {
      var prodDto =  new ProductDto();
        prodDto.name = this.productForm.controls["name"].value,
        prodDto.description = this.productForm.controls["description"].value,
        prodDto.price = this.productForm.controls["price"].value,
        prodDto.inStock = this.productForm.controls["inStock"].value
    
      this.newProductEvent.emit(prodDto);
    }
    console.log(this.productForm.value);
  }

  cancel() {
    this.hideFormEvent.emit(true);
  }

}

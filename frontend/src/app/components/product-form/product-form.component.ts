import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductDto } from 'src/app/models/dto/create-product-dto';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Output() newProductEvent = new EventEmitter<ProductDto>();

  categories = ["Eiweiss", "Aminosäure", "Vitamin", "Ballaststoffe"];

/**      
    id: number;

    name: string;

    description: string;

    category: string;

    price: number;

    inStock: boolean;
*/

  model = new ProductDto();

  submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  addNewProduct(product: ProductDto) {
    this.newProductEvent.emit(product);
  }

  onSubmit() {
    this.submitted = true;
    if(!this.model.inStock) this.model.inStock = false;
    this.addNewProduct(this.model);
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | undefined;
  @Output() onDeleteProduct:  EventEmitter<Product> = new EventEmitter();
  @Output() onToggleReminder:  EventEmitter<Product> = new EventEmitter();
  @Output() onEditProduct: EventEmitter<Product> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(product: Product) {
    this.onDeleteProduct.emit(product);
  }

  onToggle(product: Product) {
    this.onToggleReminder.emit(product);
  }

  onEdit(product: Product) {
    this.onEditProduct.emit(product);
  }

}

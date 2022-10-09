import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { UiService } from 'src/app/services/ui.service'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @Output() onAddProduct: EventEmitter<Product> = new EventEmitter();
  @Output() onEditProduct: EventEmitter<Product> = new EventEmitter();
  @Input() product?: Product | null;

  form!: FormGroup;

  showAddProduct: boolean = false;
  subscription: Subscription | undefined;
  editMode: boolean = false;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => this.showAddProduct = value);
  }

  ngOnInit(): void {
    this.showAddProduct = true;
    if(this.product != null) {
      this.editMode = true;
      this.uiService.toggleShowAddProduct();
    }
    this.initForm();
  }

  initForm(): void {
      this.form = new FormGroup({
        name: new FormControl(this.product ? this.product.name : "", Validators.required),
        description: new FormControl(this.product ? this.product.description : "", Validators.required),
        price: new FormControl(this.product ? this.product.price : "", Validators.required),
        inStock: new FormControl(this.product ? this.product.inStock : "")
      });
  }
  
  ngOnDestroy() {
    this.subscription!.unsubscribe();
  }

  onSubmit() {
    if(!this.form.valid){
      alert('Alle Felder sind verpflichtend!');
      return;
    }

    const product: Product = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      price: this.form.get('price')?.value,
      inStock: this.form.get('inStock')?.value ? true : false
    };

    if(!this.editMode)
        this.onAddProduct.emit(product);
    else {
        product.id = this.product?.id;
        this.onEditProduct.emit(product);      
    }

    this.form.reset();
    this.product = null;
    this.showAddProduct = false;
    this.uiService.toggleShowAddProduct();
  }

  onCancel() {
    this.form.reset();
    this.product = null;
    this.showAddProduct = false;
    this.uiService.toggleShowAddProduct();
  }

}

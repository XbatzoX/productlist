import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  productForm = new FormGroup({
    name: new FormControl('n/a'),
    description: new FormControl('n/a'),
    stock: new FormControl(0),
    price: new FormControl(0.00)
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.productForm.value);
  }
}

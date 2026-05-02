import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Products } from '../../services/products';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  productService = inject(Products);

  list = this.productService.productlist;

}

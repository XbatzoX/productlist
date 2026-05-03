import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../services/products';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {

  private route = inject(ActivatedRoute);
  productService = inject(Products);

  ngOnInit(){
    let currentName = this.route.snapshot.paramMap.get('name');
    if(currentName){this.productService.setProductDetailByName(currentName);}
    this.detail = this.productService.productdetail;
  }

  detail = {
    "name": "n/a",
    "description": "n/a",
    "specs": "n/a",
    "stock": 0,
    "price": 0
  }

  deleteDetail():void{
    this.detail.name = '';
  }
}

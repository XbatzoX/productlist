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

  detail = this.productService.productdetail;

  ngOnInit(){
    let currentId = Number(this.route.snapshot.paramMap.get('id'));
    if(currentId){this.productService.setProductDetailById(currentId);}
  }

  deleteDetail():void{
    // this.detail.name = '';
  }
}

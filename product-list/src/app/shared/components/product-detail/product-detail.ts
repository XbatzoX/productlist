import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../../services/products';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {

  private route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(Products);

  detail = this.productService.productdetail;

  ngOnInit(){
    let currentId = Number(this.route.snapshot.paramMap.get('id'));
    if(currentId){this.productService.setProductDetailById(currentId);}
  }

  async deleteDetail(){
    // this.detail.name = '';
    this.productService.deleteProduct(this.detail().id);
    this.router.navigate([""]);
  }
}

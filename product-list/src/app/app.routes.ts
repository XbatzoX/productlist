import { Routes } from '@angular/router';
import { ProductDetail } from './shared/components/product-detail/product-detail';
import { ProductList } from './shared/components/product-list/product-list';

export const routes: Routes = [
    {path:'', component:ProductList},
    {path:"detail", component: ProductDetail}
];

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { ProductList } from './shared/components/product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ProductList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('product-list');
}

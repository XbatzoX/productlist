import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  detail = {
    "name": "Gaming Maus",
    "description": "Eine ergonomische Gaming-Maus mit hoher Präzision und einstellbarer DPI. Ideal für FPS- und MOBA-Spiele, bietet sie eine langlebige Bauweise und komfortable Seitentasten für schnelles Reagieren.",
    "specs": "dpi: 6400, cable length: 1.8m, color: Schwarz",
    "stock": 120,
    "price": 29.99
  }
}

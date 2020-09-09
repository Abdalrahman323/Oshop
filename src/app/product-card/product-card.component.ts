import { ShoppingCartService } from './../shopping-cart.service';
import { product } from './../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: product
  @Input('show-actions') showActions: boolean = true;
  constructor(private ShoppingCartService: ShoppingCartService) { }

  addToCart(product: product) {

    this.ShoppingCartService.addToCart(product);

  }

}

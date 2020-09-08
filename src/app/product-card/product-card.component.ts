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

    let CartId = localStorage.getItem('cartId');
    if (!CartId) {
      this.ShoppingCartService.createCart().then(result => {
        localStorage.setItem('cartId', result.key)

        //Add product to cart
      });
    } else {

        //Add product to cart

    }

  }

}

import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
  @Input('product') product: Product
  @Input('shopping-cart') shoppingCart;

  constructor( private ShoppingCartService: ShoppingCartService) { }
  addToCart() {

    this.ShoppingCartService.addToCart(this.product);
  }
  removeFromCart(){
    this.ShoppingCartService.removeFromCart(this.product);

  }



}

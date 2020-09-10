import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart;
  constructor(private ShoppingCartService: ShoppingCartService) { }

  addToCart() {

    this.ShoppingCartService.addToCart(this.product);
  }
  removeFromCart(){
    this.ShoppingCartService.removeFromCart(this.product);

  }
  getQuantity() {
    // because intially when we get the shopping cart from firebase
    // it's going to be a tiny delay , so during this time this shopping cart is going to be null
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }


}

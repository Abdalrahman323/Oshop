import { isNgTemplate } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping = {};
  cart: ShoppingCart;
  subscription: Subscription
  constructor(
    private orderService:OrderService,
    private shoppingCartService: ShoppingCartService) { }


  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart()
    this.subscription = cart$.subscribe(cart => this.cart = cart)
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();
  }

  placeOrder() {
    let order = {
      dataPlaced: new Date().getTime(),
      shippnig: this.shipping,
      items: this.cart.items.map(shoppingCartItem =>{
        return  {
          product:{
             title:shoppingCartItem.title,
             imageUrl:shoppingCartItem.imageUrl,
             price: shoppingCartItem.price
          },
          quantity:shoppingCartItem.quantity,
          totalPrice:shoppingCartItem.totalPrice
        }
      })
    };

    this.orderService.storeOrder(order);
  }
}

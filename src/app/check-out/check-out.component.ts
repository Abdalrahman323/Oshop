import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Order } from '../models/order';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping: any = {};
  cart: ShoppingCart;
  userId: String;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) { }


  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart()
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  placeOrder() {

    let order = new Order(this.userId,this.shipping,this.cart);
    this.orderService.storeOrder(order);
  }
  ngOnDestroy() {

    this.cartSubscription.unsubscribe();

    this.userSubscription.unsubscribe();
  }
}

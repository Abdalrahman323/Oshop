import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Order } from '../models/order';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Router } from '@angular/router';

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
    private router:Router,
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) { }


  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart()
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {

    let order = new Order(this.userId,this.shipping,this.cart);
    let result= await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key])
  }
  ngOnDestroy() {

    this.cartSubscription.unsubscribe();

    this.userSubscription.unsubscribe();
  }
}

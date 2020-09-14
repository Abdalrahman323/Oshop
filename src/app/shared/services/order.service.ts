import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase,private shoppingCartService:ShoppingCartService) { }

  async placeOrder(order){
    
    let result = await this.db.list('/orders').push(order); 
    this.shoppingCartService.clearCart();
    return result;
  }
  getOrders(){
    return this.db.list('/orders').snapshotChanges();
  }
// #Tip
// when you wanna filter data in firebase
// you will set (orderByChild) 
// and then either (equalTo ) or another propety like (startAt , endAt)
// covering filters in more details in "Angular build enterpise application"
  getOrdersByUser(userId:string){
 
    return this.db.list('/orders', (ref) =>(
      ref.orderByChild('userId').equalTo(userId))).snapshotChanges();

  }
}

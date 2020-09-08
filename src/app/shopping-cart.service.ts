import { product } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private createCart() {
    return this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCard(product: product) {

    let CartId = localStorage.getItem('cartId');
    if (!CartId) {
      let result = await this.createCart();
      localStorage.setItem('cartId', result.key)
      return this.getCart(result.key)
    }
  
      return this.getCart(CartId)


  }
}

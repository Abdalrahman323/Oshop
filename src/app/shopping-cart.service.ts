import { product } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

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
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId); // reference  to item node in firebase

  }

  private async getOrCreateCardId(product: product) { // this method returns a promise

    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.createCart();
    localStorage.setItem('cartId', result.key)
    return result.key;
  }
  async addToCart(product: product) {
    let cartId = await this.getOrCreateCardId(product);
    let item$=this.getItem(cartId,product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.val()) item$.update({ quantity: item.payload.val().quantity + 1 });
      else item$.set({ product: product, quantity: 1 });
    })
  }
}

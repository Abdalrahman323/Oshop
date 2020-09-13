import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';

import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCardId();
    return this.db.object('/shopping-carts/' + cartId)
    .snapshotChanges()
    .pipe(
      map((x : any) =>
         new ShoppingCart(x.payload.val().items)
        ));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);

  }

  async clearCart(){
    let cartId = await this.getOrCreateCardId();
    this.db.object('/shopping-carts/'+cartId+'/items').remove();
  }

  private createCart() {
    return this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime()
    });
  }


  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId); // reference  to item node in firebase

  }

  private async getOrCreateCardId(): Promise<string> { // this method returns a promise

    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.createCart();
    localStorage.setItem('cartId', result.key)
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCardId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.val()) item$.update({ quantity: item.payload.val().quantity + change });
      else item$.set({
        //product: product,
        title:product.title,
        imageUrl:product.imageUrl,
        price:product.price,
        quantity: 1 });
    })
  }
}

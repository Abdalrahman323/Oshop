import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  createCart() {
    return this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime()
    });
  }
}

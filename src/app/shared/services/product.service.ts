import { Product } from '../models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAllProducts() {
    return this.db.list('/products').snapshotChanges();
  }

  getProduct(prductId) {
    return this.db.object('/products/' + prductId).snapshotChanges();
  }

  updateProduct(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  deleteProduct(productId) {
    return this.db.object('/products/' + productId).remove();
  }
  mapFB_product(FB_product: any) {
    let product = {} as Product;
  
    product.key = FB_product.key;
    product.title = FB_product.payload.val().title;
    product.price = FB_product.payload.val().price;
    product.category = FB_product.payload.val().category;
    product.imageUrl = FB_product.payload.val().imageUrl;
    return product;


  }
  mapFB_products(FB_products: any) {
    let products: Product[] = [];
    FB_products.forEach(FB_product => {
      products.push(this.mapFB_product(FB_product));
    });
    return products;
  }

}

import { Product } from './product';

export class ShoppingCartItem {
 key:string; 
 title:string;
 imageUrl:string;
 price:number;
 quantity:number;
// what's that means
// this means init can be an object that looks the shopping cart item object
// it can have one or more property
 constructor (init? : Partial<ShoppingCartItem>){
     Object.assign(this,init);
 }
 
 get totalPrice (){  return this.price * this.quantity;}
}
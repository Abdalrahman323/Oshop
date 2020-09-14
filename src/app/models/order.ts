import {ShoppingCart} from './shopping-cart'
export class Order {

    datePlaced: number;
    items:any[];

    constructor(public userId: String, public shippingInfo: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items= shoppingCart.items.map(shoppingCartItem => {
            return {
              product: {
                title: shoppingCartItem.title,
                imageUrl: shoppingCartItem.imageUrl,
                price: shoppingCartItem.price
              },
              quantity: shoppingCartItem.quantity,
              totalPrice: shoppingCartItem.totalPrice
            }
          });
    }
}
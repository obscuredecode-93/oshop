import { ShoppingCart } from "./shopping-cart";
import { Shipping } from "./shipping";

export class Order {
    datePlaced: number;
    items : any[];

    constructor(public userId:string, public shipping:Shipping, shoppingCart:ShoppingCart){
        this.datePlaced = new Date().getTime();
        this.items = shoppingCart.items.map(i => {
            return {
              product:{
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
          })
    }
}
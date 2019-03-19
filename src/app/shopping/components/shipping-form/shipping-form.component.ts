import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../../../shared/models/order';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Shipping } from '../../../shared/models/shipping';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  shipping:Shipping;
  userId : string; 
  userSubscription: Subscription;
  @Input('cart') cart: ShoppingCart;

  constructor(private orderService: OrderService,
    private authService: AuthService,
    private router:Router){

  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    this.shipping = new Shipping();
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  } 

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    console.log(this.shipping);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}

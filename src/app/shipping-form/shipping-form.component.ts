import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  shipping = {};
  userId : string; 
  userSubscription: Subscription;
  @Input('cart') cart: ShoppingCart;

  constructor(private orderService: OrderService,
    private authService: AuthService,
    private router:Router){

  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  } 
}

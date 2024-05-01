import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  title = 'cart';
  products: any = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.products = this.cartService.getItems();
    console.log(this.products)
  }

}
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
  readonly ApiUrl="http://localhost:3000/api/webshop/"

  constructor(private http:HttpClient, private cartService: CartService) {
  }
  
  products: any = [];
  cartProducts: any = [];

  refreshProducts() {
    this.http.get(this.ApiUrl + 'GetProducts').subscribe(data => {
      this.products = data;
    })
  }

  ngOnInit() {
    this.refreshProducts();
  }

  addToCart(product: any) {
    console.log("Termék hozzáadva a kosárhoz:", product);
    this.cartProducts.push(product)
  }

  removeFromCart(product: any) {
    this.cartProducts = this.cartProducts.filter((p: any) => p !== product);
  }

}

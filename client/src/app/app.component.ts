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

  totalPrice = 0;
  addToCart(product: any) {
    const cartProduct = this.cartProducts.find((p: { id: any; }) => p.id === product.id);

    if (cartProduct) {
        cartProduct.quantity += 1;
        this.totalPrice += cartProduct.price;
        console.log("Már a kosárban volt, mennyiség növelve:", cartProduct);
    } else {
        const newProduct = { ...product, quantity: 1 };
        this.totalPrice += newProduct.price;
        this.cartProducts.push(newProduct);
        console.log("Új termék hozzáadva a kosárhoz:", newProduct);
    }
}

removeFromCart(product: any) {
  const cartProduct = this.cartProducts.find((p: { id: any; }) => p.id === product.id);

  if (cartProduct) {
      if (cartProduct.quantity > 1) {
          cartProduct.quantity -= 1;
          this.totalPrice -= cartProduct.price;
          console.log("Mennyiség csökkentve:", cartProduct);
      } else {
          this.cartProducts = this.cartProducts.filter((p: { id: any; }) => p.id !== product.id);
          this.totalPrice -= cartProduct.price;
          console.log("Termék eltávolítva a kosárból:", product);
      }
  } else {
      console.log("A termék nincs a kosárban:", product);
  }

  console.log("Összesített ár:", this.totalPrice);
}

}

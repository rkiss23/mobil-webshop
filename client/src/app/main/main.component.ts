import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  title = 'client';
  readonly ApiUrl="http://localhost:3000/api/products/"

  constructor(private http:HttpClient) {
  }
  
  products: any = [];
  cartProducts: any = [];

  refreshProducts() {
    this.http.get(this.ApiUrl + 'get').subscribe(data => {
      this.products = data;
    })
  }

  ngOnInit() {
    this.refreshProducts();
  }

  totalPrice = 0;
  cartCount = 0;
  addToCart(product: any) {
    const cartProduct = this.cartProducts.find((p: { id: any; }) => p.id === product.id);
    this.cartCount++;

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
  this.cartCount--;

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

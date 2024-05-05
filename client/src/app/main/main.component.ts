import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
 

  constructor(private http:HttpClient, private authService: AuthService, private router: Router) {
    
  }
  
  products: any = [];
  cartProducts: any = [];
  loggedIn: boolean = false;
  isAdmidmin: boolean = false;

  refreshProducts() {
    this.http.get(this.ApiUrl + 'get').subscribe(data => {
      this.products = data;
    })
  }

  ngOnInit() {
    this.refreshProducts();
    if (typeof window !== 'undefined' && window.localStorage) {
      
      this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      this.isAdmidmin = localStorage.getItem('isAdmin') === 'true';

    }

    
    
  }


  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  
  isAdmin(): boolean {
    return this.isAdmidmin;
  }

  logout() {
    this.authService.logout();
    this.loggedIn = false;
    this.cartProducts = [];
    this.cartCount = 0;
    this.totalPrice = 0;
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
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

deleteProduct(product: any) {
  const productId = product.id;
  this.http.delete(this.ApiUrl + 'delete', { params: { id: productId } }).subscribe(
    (response) => {
      console.log('Termék sikeresen törölve:', response);
      this.refreshProducts();
    },
    (error) => {
      console.error('Hiba történt a termék törlése során:', error);
    }
  );
}


editProduct(product: any) {
  const newTitle = prompt('Add meg a termék új nevét:', product.title);
  const newDescription = prompt('Add meg a termék új leírását:', product.description);

  const newPriceStr = prompt('Add meg a termék új árát:', product.price.toString());
  const newPrice = newPriceStr !== null ? parseFloat(newPriceStr) : NaN;


  if (newTitle && newDescription && !isNaN(newPrice)) {
    const updatedProduct = { ...product, title: newTitle, description: newDescription, price: newPrice };
    this.http.put(this.ApiUrl + 'update', updatedProduct).subscribe(
      (response) => {
        console.log('Termék sikeresen frissítve:', response);
        this.refreshProducts();
      },
      (error) => {
        console.error('Hiba történt a termék frissítése során:', error);
      }
    );
  }
}

addNewProduct() {
  const title = prompt('Add meg az új termék nevét:');
  const description = prompt('Add meg az új termék leírását:');
  const priceStr = prompt('Add meg az új termék árát:');
  const price = priceStr !== null ? parseFloat(priceStr) : NaN;

  if (title && description && !isNaN(price)) {
    const newProduct = { title, description, price, image: 'iphone_15.jpg' };
    this.http.post(this.ApiUrl + 'create', newProduct).subscribe(
      (response) => {
        console.log('Új termék sikeresen hozzáadva:', response);
        this.refreshProducts();
      },
      (error) => {
        console.error('Hiba történt az új termék hozzáadása során:', error);
      }
    );
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

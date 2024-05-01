import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'cart', component: CartComponent }
];

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms'; // Importáltad a FormsModule-t
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    RegistrationComponent 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule // Hozzáadtad a FormsModule-t az imports tömbhöz
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

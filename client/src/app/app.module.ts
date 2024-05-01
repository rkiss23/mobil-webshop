import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Corrected import
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor

@NgModule({
  declarations: [
    AppComponent
    // Add your components here
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Corrected import
    CommonModule // Added CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
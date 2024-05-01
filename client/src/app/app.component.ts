import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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

  constructor(private http:HttpClient) {
  }
  products:any=[];

  refreshProducts() {
    this.http.get(this.ApiUrl + 'GetProducts').subscribe(data => {
      this.products = data;
      console.log(data)
    })
  }

  ngOnInit() {
    this.refreshProducts();
  }

}

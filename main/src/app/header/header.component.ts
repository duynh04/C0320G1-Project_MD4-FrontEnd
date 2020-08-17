import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public products;

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit() {
    // @ts-ignore
    this.productService.getProduct().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }

}

import { product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: product[];
  filterdProducts: product[];
  subscription: Subscription
  
  constructor(private ProductService: ProductService) {
    this.subscription = this.ProductService.getAllProducts().subscribe(products => {
      this.filterdProducts = this.products = this.ProductService.mapFB_products(products)
    });
  }


  ngOnInit(): void {
  }
  filter(query: string) {
    this.filterdProducts = (query) ?
      this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

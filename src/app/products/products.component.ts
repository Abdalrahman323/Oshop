import { product } from './../models/product';
import { ProductService } from './../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscriptionGetAllProducts: Subscription;

  products: product[] = [];
  filteredProducts: product[] = [];
  category: string;

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService) { }

  ngOnInit(): void {


    this.subscriptionGetAllProducts = this.ProductService.getAllProducts()
      .pipe(
        switchMap(products => {
          this.filteredProducts = this.products = this.ProductService.mapFB_products(products);
          return this.route.queryParamMap
        }))
      .subscribe(params => {  // we have to make sure the products arrive first before we doing any filter      
        this.category = params.get('category');
        this.filterByProducts();

      })



  }

  filterByProducts() {
    this.filteredProducts = (this.category) ?
      this.products.filter(product => product.category == this.category) :
      this.products;
  }
  ngOnDestroy(): void {
    this.subscriptionGetAllProducts.unsubscribe();

  }



}

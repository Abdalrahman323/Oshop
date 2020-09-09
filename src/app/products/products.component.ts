import { ShoppingCartService } from './../shopping-cart.service';
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
  subscriptionGetCart: Subscription;


  products: product[] = [];
  filteredProducts: product[] = [];
  category: string;
  cart: any;

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private ShoppingCartService: ShoppingCartService) { }

  async ngOnInit() {

    this.subscriptionGetCart = (await this.ShoppingCartService.getCart()).snapshotChanges()
    .subscribe(cart => this.cart = cart.payload.val())

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
    this.subscriptionGetCart.unsubscribe();

  }



}

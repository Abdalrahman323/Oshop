import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Product } from '../shared/models/product';
import { ProductService } from '../shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {



  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private ShoppingCartService: ShoppingCartService) { }

  async ngOnInit() {

    this.cart$ = await this.ShoppingCartService.getCart();

    this.populateProducts();

  }
  
  private populateProducts(){
    this.productService.getAllProducts()
    .pipe(
      switchMap(products => {
        this.filteredProducts = this.products = this.productService.mapFB_products(products);
        return this.route.queryParamMap
      }))
    .subscribe(params => {  // we have to make sure the products arrive first before we doing any filter      
      this.category = params.get('category');
      this.applyFilter();

    })
  }

  private applyFilter() {
      this.filteredProducts = (this.category) ?
      this.products.filter(product => product.category == this.category) :
      this.products;
  }


}

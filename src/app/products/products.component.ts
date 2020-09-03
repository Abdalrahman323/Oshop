import { CategoryService } from './../category.service';
import { product } from './../models/product';
import { ProductService } from './../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscriptionGetAllProducts: Subscription;

  products: product[] = [];
  filteredProducts: product[] = [];
  categories$;
  category: string;

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService, private CategoryService: CategoryService) { }

  ngOnInit(): void {


    this.subscriptionGetAllProducts = this.ProductService.getAllProducts().subscribe(products => {
      this.filteredProducts = this.products = this.ProductService.mapFB_products(products);
      // handling the refresh page with queyParam in the url ; so need to filter the products
      this.filterByProducts();
    });

    this.categories$ = this.CategoryService.getAllCategories();
    // handling the navigation case , listen to queryParamMap observable
    this.route.queryParamMap.subscribe(params => {
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

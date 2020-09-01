import { Router } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  constructor(
    private router:Router,
    private CategoryService: CategoryService,
     private ProductService: ProductService) {
    this.categories$ = CategoryService.getCategories();
  }

  save(product) {
   this.ProductService.create(product);
   this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}

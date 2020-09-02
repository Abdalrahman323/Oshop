import { product } from './../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private CategoryService: CategoryService,
    private ProductService: ProductService) {
      
    this.product = {} as product;
    this.categories$ = CategoryService.getCategories();

    let productId = this.route.snapshot.paramMap.get('id');
    if (productId) this.ProductService.getProduct(productId).pipe(take(1),).subscribe(product => {

      this.product = product.payload.val();
      // console.log(JSON.stringify(this.product));
    })


  }

  save(product) {
    this.ProductService.create(product);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}

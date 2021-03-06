import { Product } from '../../../shared/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
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
  productId;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private CategoryService: CategoryService,
    private ProductService: ProductService) {

    this.product = {} as Product;
    this.categories$ = CategoryService.getAllCategories();

    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) this.ProductService.getProduct(this.productId).pipe(take(1),).subscribe(product => {

      this.product =this.ProductService.mapFB_product(product);
      // console.log(JSON.stringify(product.payload.val()));
    })


  }

  save(product) {

    if (this.productId) this.ProductService.updateProduct(this.productId, this.product);
    else this.ProductService.create(product);
    this.router.navigate(['/admin/products']);
  }
  deleteProduct() {
    if (confirm('Are you sure you want to delete this product')) {
      this.ProductService.deleteProduct(this.productId);
      this.router.navigate(['/admin/products']);
    }

  }

  ngOnInit(): void {
  }

}

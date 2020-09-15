import { CategoryService } from './../../../../shared/services/category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  categories$;
  @Input('category') category;

  constructor( private CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories$ = this.CategoryService.getAllCategories();

  }

}

import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product ={};
  id;

  constructor(private categoryService: CategoryService,
              private productService: ProductService, 
              private router:Router,
              private route: ActivatedRoute ) { 
    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if(this.id) { console.log('yo'); this.productService.get(this.id).take(1).subscribe(p => this.product = p)} 
    //console.log(this.product);
  }

  ngOnInit() {
  }
  save(product){

    if(this.id) this.productService.update(this.id,product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']); 
  }

}
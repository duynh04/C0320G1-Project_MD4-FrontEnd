import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../shared/services/product.service';
import {Router} from '@angular/router';
import {CategoryService} from '../shared/services/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private createProductForm: FormGroup;
  private categoriesList;

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private router: Router,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.createProductForm = this.fb.group({
      productName: ['', [Validators.required, Validators.pattern('^[A-Z]{1}[A-Z0-9]$')]],
      initialPrice: ['', [Validators.required, Validators.min(0)]],
      increaseAmount: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      productDescription: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]')]],
      productCategoryId: ['']
    });

    this.categoryService.getCategoriesList().subscribe( data => {
    this.categoriesList = data;
    });
  }

  onSubmit() {
    this.productService.createProduct(this.createProductForm.value).subscribe(
      data => {
        this.router.navigateByUrl('product');
        alert('Đã gửi yêu cầu đấu giá thành công. Vui lòng chờ phê duyệt!');
      }
    );
  }
}

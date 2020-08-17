import { Component, OnInit } from '@angular/core';
import {Category} from "../../shared/models/category";
import {Product} from "../../shared/models/product";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from '../../shared/services/product.service';
import {CategoryService} from "../../shared/services/category.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
// Coder: Nguyen Thanh Tu
export class ProductListComponent implements OnInit {

  categories: Category[];
  products: Product[];
  productOfId;
  form: FormGroup;
  editProductForm: FormGroup;
  value = this.fb.group({
    productName: ['', Validators.required],
    productInitalPrice: ['', Validators.required],
    productIncreaseAmount: ['', Validators.required],
    productRegisterDate: ['', Validators.required],
    productStartDate: ['', Validators.required],
    productEndDate: ['', Validators.required],
    productDescription: ['', Validators.required],
    productCategoryId: ['', Validators.required],
    productOwnerId: ['', Validators.required],
  });
  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      products: this.fb.array([

      ])
    });
    this.categoryService.getCategories().subscribe(next => {
      this.categories = next;
    });

    this.editProductForm = new FormGroup({
      productName: new  FormControl(''),
      productInitalPrice: new FormControl(''),
      productIncreaseAmount: new FormControl(''),
      productRegisterDate: new FormControl(''),
      productStartDate: new FormControl(''),
      productEndDate: new FormControl(''),
      productDescription: new FormControl(''),
      productApprovementStatusId: new FormControl(''),
      productCategoryId: new FormControl(''),
      productOwnerId: new FormControl(''),
    });
    this.productService.getProducts().subscribe(next => {
      this.products = next;
    });
  }

  addGroup() {
    const val = this.fb.group({
      productName: ['', Validators.required],
      productInitalPrice: ['', Validators.required],
      productIncreaseAmount: ['', Validators.required],
      productRegisterDate: ['', Validators.required],
      productStartDate: ['', Validators.required],
      productEndDate: ['', Validators.required],
      productDescription: ['', Validators.required],
      productApprovementStatusId: ['', Validators.required],
      productCategoryId: ['', Validators.required],
      productOwnerId: ['', Validators.required],
    });

    const form = this.form.get('products') as FormArray
    form.push(val);

  }

  removeGroup(index) {
    const form = this.form.get('products') as FormArray
    form.removeAt(index);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  createNewProduct() {
    console.log(this.categories)
    const products = this.form.get('products') as FormArray;
    console.log(this.form.value);
    console.log((<FormArray> this.form.get('products')).length);
    for (let i = 0; i < (<FormArray> this.form.get('products')).length; i++) {
      this.productService.addProduct(((<FormArray> this.form.get('products')).at(i)).value).subscribe(
        () => {
        }
      );
    }
  }

}

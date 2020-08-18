import { Component, OnInit } from '@angular/core';
import {Category} from '../../shared/models/category';
import {Product} from '../../shared/models/product';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import {CategoryService} from '../../shared/services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductCreateDTO} from "../../shared/models/dtos/ProductCreateDTO ";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
// Coder: Nguyen Thanh Tu
export class ProductListComponent implements OnInit {

  categories: Category[];
  products: ProductCreateDTO[];
  productOfId;
  form: FormGroup;
  editProductForm: FormGroup;
  value = this.fb.group({
    name: ['', Validators.required],
    initialPrice: ['', Validators.required],
    increaseAmount: ['', Validators.required],
    registerDate: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    description: ['', Validators.required],
    approvementStatusId: ['', Validators.required],
    categoryId: ['', Validators.required],
    ownerId: ['', Validators.required],
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
      name: new  FormControl(''),
      initialPrice: new FormControl(''),
      increaseAmount: new FormControl(''),
      registerDate: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      description: new FormControl(''),
      approvementStatusId: new FormControl(''),
      categoryId: new FormControl(''),
      ownerId: new FormControl(''),
    });
    this.productService.getProducts().subscribe(next => {
      this.products = next;
    });
  }

  addGroup() {
    const val = this.fb.group({
      name: ['', Validators.required],
      initialPrice: ['', Validators.required],
      increaseAmount: ['', Validators.required],
      registerDate: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
      approvementStatusId: ['', Validators.required],
      categoryId: ['', Validators.required],
      ownerId: ['', Validators.required],
    });

    const form = this.form.get('products') as FormArray;
    form.push(val);

  }

  removeGroup(index) {
    const form = this.form.get('products') as FormArray;
    form.removeAt(index);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  createNewProduct() {
    console.log(this.categories);
    const products = this.form.get('products') as FormArray;
    console.log('test');
    console.log(this.form.value);
    console.log((this.form.get('products') as FormArray).length);
    for (let i = 0; i < (this.form.get('products') as FormArray).length; i++) {
      this.productService.addProduct(((this.form.get('products') as FormArray).at(i)).value).subscribe(
        () => {
        }
      );
    }
  }

}

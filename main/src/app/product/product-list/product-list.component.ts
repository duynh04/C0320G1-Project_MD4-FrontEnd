import { Component, OnInit } from '@angular/core';
import {Category} from '../../shared/models/category';
import {Product} from '../../shared/models/product';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import {CategoryService} from '../../shared/services/category.service';
import {Observable} from 'rxjs';
import * as $ from 'jquery';
import {ApprovementStatus} from '../../shared/models/Approvement-status';
import {ApprovementStatusService} from '../../shared/services/approvement.status.service';
import {Router} from "@angular/router";
import {ProductDto} from "../../shared/models/dtos/ProductDto ";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
// creator Long
  private formSearchList: FormGroup;
  private products: Observable<Product[]>;


// creator Tu
  private listProduct: Product[];
  private listCategory: Category[];
  private listApprovementStatuses: ApprovementStatus[];
  private Form: FormGroup;
  private formArray: FormArray = new FormArray([]);
  private formEditListRow: FormGroup;

  constructor(private productsService: ProductService,
              private router: Router,
              private formBuilder: FormBuilder,
              // creator Tu
              private categoryService: CategoryService,
              private approvementStatusService: ApprovementStatusService,
  ) {}
  reloadData() {
    this.products = this.productsService.getProductList();
    // creator Tu
    this.categoryService.getCategoryList();
  }

  ngOnInit() {
    // creator Thanh Long
    this.reloadData();
    this.formSearchList = this.formBuilder.group({
      name: ['', [ Validators.pattern('^[A-Za-z0-9]{0,}$')]],
      owner: ['', [ Validators.pattern('^[A-Za-z0-9]{0,}$')]]
    });
    // creator Tu
    this.listProduct = new Array<Product>();
    this.productsService.getProductList().subscribe(next => {
      this.listProduct = next;
    });
    this.listCategory = new Array<Category>();
    this.categoryService.getCategoryList().subscribe(next => {
      this.listCategory = next;
    });
    this.listApprovementStatuses = new Array<ApprovementStatus>();
    this.approvementStatusService.getApprovementStatusList().subscribe(next => {
      this.listApprovementStatuses = next;
    });
    this.Form = this.formBuilder.group({
      products: this.formBuilder.array([

      ])
    });

    this.formEditListRow = new FormGroup({
      id: new  FormControl(''),
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
      // productImages: new FormControl(''),
    });

  }

  createProdFormGroup() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[^~!@#$%^&*()_+]+$/), Validators.pattern(/^[^\s]+$/)]],
      initialPrice: ['', [Validators.required]],
      increaseAmount: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9]{0,}$')
      ])),
      registerDate: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9]{0,}$')
      ])),
      startDate: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9]{0,}$')
      ])),
      endDate: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9]{0,}$')
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9]{0,}$')
      ])),
      approvementStatusId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9]{0,}$')
      ])),
      categoryId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9]{0,}$')
      ])),
      ownerId: ['', [Validators.required]]
    });
  }
  addRow(): void {
    this.formArray.push(this.createProdFormGroup());
  }
  removeGroup(index) {
    this.formArray.removeAt(index);
  }

  createNewProduct() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.formArray.length; i++) {
      this.productsService.addProduct(this.formArray.at(i).value).subscribe(
        () => {
        }
      );
    }
    this.formArray.clear();
    window.location.reload();
    this.router.navigateByUrl('//product/list');
  }

  editRowData(id: number) {
    const index = id - 1;
    const product = this.listProduct[index];
    const productDto = new ProductDto();
    productDto.approvementStatusId = product.approvementStatus.id;
    productDto.categoryId = product.category.id;
    productDto.ownerId = product.owner.id;
    productDto.description = product.description;
    productDto.endDate = product.endDate;
    productDto.registerDate = product.registerDate;
    productDto.startDate = product.startDate;
    productDto.id = product.id;
    productDto.name = product.name;
    productDto.increaseAmount = product.increaseAmount;
    productDto.initialPrice = product.initialPrice;
    console.log(productDto);
    this.formEditListRow.patchValue(productDto);
    const name1 = 'inputData' + id;
    const name2 = 'displayData' + id;
    const name3 = 'editData' + id;
    const name4 = 'saveData' + id;
    const name5 = 'cancelEdit' + id;
    console.log(name1);
    console.log(name2);
    $(`input[name= ${name1}]`).show();
    $(`input[name= ${name2}]`).hide();
    $(`button[name= ${name3}]`).hide();
    $(`button[name= ${name4}]`).show();
    $(`button[name= ${name5}]`).show();
  }

  cancelEdit(id: number) {
    const name1 = 'inputData' + id;
    const name2 = 'displayData' + id;
    const name3 = 'editData' + id;
    const name4 = 'saveData' + id;
    const name5 = 'cancelEdit' + id;
    $(`input[name= ${name1}]`).hide();
    $(`input[name= ${name2}]`).show();
    $(`button[name= ${name3}]`).show();
    $(`button[name= ${name4}]`).hide();
    $(`button[name= ${name5}]`).hide();
  }

  updateProduct(id: number) {
    console.log(id);
    console.log(this.formEditListRow);
    this.productsService.editProduct(this.formEditListRow.value, id).subscribe(
      () => {
        console.log('created');
        window.location.reload();
        this.router.navigateByUrl('/product/list');
      }
    );
    const name1 = 'inputData' + id;
    const name2 = 'outputData' + id;
    $(`input[name= ${name1}]`).hide();
    $(`input[name= ${name2}]`).show();
  }
}

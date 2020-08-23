import { Component, OnInit } from '@angular/core';
import {Category} from '../../shared/models/category';
import {Product} from '../../shared/models/product';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import {CategoryService} from '../../shared/services/category.service';
import {Observable, Subscription} from 'rxjs';
import * as $ from 'jquery';
import {ApprovementStatus} from '../../shared/models/Approvement-status';
import {ApprovementStatusService} from '../../shared/services/approvement.status.service';
import {Router} from '@angular/router';
import {ProductDto} from '../../shared/models/dtos/ProductDto ';
import {ValidateService} from '../../shared/validations/productS.service';
import {ProductServices} from '../../shared/services/productServices.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';


declare let $: any;
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
// creator Long
  private formSearchList: FormGroup;
  private products: Observable<Product[]>;

// Creator: Son
  formAddNewProduct: FormGroup;
  registerDate: Date = new Date();
  public categoryList;
  private category;
  ownerObject;
  thongtin: String;


// creator Tu
  files: File[] = [];
  imgSrc: any;
  selectedImage: any = null;
  listProductUpdateToDb = new Array<number>();
  editField: string;
  private listProduct: Product[];
  private listCategory: Category[];
  private listApprovementStatuses: ApprovementStatus[];
  private Form: FormGroup;
  private formArray: FormArray = new FormArray([]);
  private formArrayEdit: FormArray = new FormArray([]);
  private formEditListRow: FormGroup;

  constructor(private productsService: ProductService,
              private router: Router,
              private formBuilder: FormBuilder,
              // creator Tu
              private storage: AngularFireStorage,
              private categoryService: CategoryService,
              private approvementStatusService: ApprovementStatusService,
              // Creator Son
              private validate: ValidateService,
              private productServices: ProductServices
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

    // Creator Son
    this.formAddNewProduct = this.formBuilder.group({
      name: ['', [Validators.required]],
      owner: ['', [Validators.required], [this.validate.validateCode(this.productServices).bind(ValidateService)]],
      category: ['', [Validators.required]],
      initialPrice: ['', [Validators.required]],
      increaseAmount: ['', [Validators.required]],
      // productImg:['',[Validators.required]],
      registerDate: [this.registerDate],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      // approvementStatus:[{id: 1, "name": "dang cho duyet" }]
    });
    // giai quyet van de ...
    $(document).ready(function() {
      $('#checkten').hide();

      $('#tenSP').change(function() {
        $('#checkten').show(1000);

        // alert("Input has been changed.");
      });
    });

    $(document).ready(function() {
      $('#checkID').hide();

      $('#idNguoiDang').change(function() {
        $('#checkID').show(1000);
        // alert("Input has been changed.");
      });
    });


    $(document).ready(function() {
      $('#checkID').hide();

      $('#idNguoiDang').change(function() {
        $('#checkID').show(1000);
        // alert("Input has been changed.");
      });
    });

    $(document).ready(function() {
      $('#checkChungLoai').hide();

      $('#chungloai').change(function() {
        $('#checkChungLoai').show(1000);
        // alert("Input has been changed.");
      });
    });

    $(document).ready(function() {
      $('#checkgiabandau').hide();

      $('#giabandau').change(function() {
        $('#checkgiabandau').show(1000);
        // alert("Input has been changed.");
      });
    });


    $(document).ready(function() {
      $('#checkbuocgia').hide();

      $('#buocgia').change(function() {
        $('#checkbuocgia').show(1000);
        // alert("Input has been changed.");
      });
    });

    $(document).ready(function() {
      $('#checkhinhanh').hide();

      $('#hinhanh').change(function() {
        $('#checkhinhanh').show(1000);
        // alert("Input has been changed.");
      });
    });

    $(document).ready(function() {
      $('#checkngaybatdau').hide();

      $('#ngaybatdau').change(function() {
        $('#checkngaybatdau').show(1000);
        // alert("Input has been changed.");
      });
    });

    $(document).ready(function() {
      $('#checkngayketthuc').hide();

      $('#ngayketthuc').change(function() {
        $('#checkngayketthuc').show(1000);
        // alert("Input has been changed.");
      });
    });

    $(document).ready(function() {
      $('#checkthongtinchitiet').hide();

      $('#thongtinchitiet').change(function() {
        $('#checkthongtinchitiet').show(1000);
        // alert("Input has been changed.");
      });
    });



    $(document).ready(function() {
      $('#kiemtra').click(function() {
        console.log('Thong tin nguoi dang da dissable');

        $('#infoOwner').prop('hidden', false);
        $('#thongTinNguoiDang').prop('disabled', true);
      });
    });



    // clear form addProduct
    $('#dismiss').on('click', function(e) {
      const $t = $(this),
        target = $t[0].href || $t.data('target') || $t.parents('.modal') || [];

      $(target)
        .find('input,textarea,select')
        .val('')
        .end()
        .find('input[type=checkbox], input[type=radio]')
        .prop('checked', '')
        .end();
      // $("#thongTinNguoiDang").prop('disabled', false)
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
      name: new  FormControl('', Validators.required),
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
// Creator: Tu
// Add new product directly
  createAddNewFormGroup() {
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
      ownerId: ['', [Validators.required]],
      productImages: this.formBuilder.array([]),
    });
  }
  addRow(): void {
    this.formArray.push(this.createAddNewFormGroup());
  }
  removeRow(index) {
    this.formArray.removeAt(index);
  }

  checkOwnerInfor() {
    this.productServices.getOwnerById(this.createAddNewFormGroup().value.ownerId).subscribe(data => {
      if (data != null) {
        console.log(data);
        this.ownerObject = data;
        // tslint:disable-next-line:max-line-length
        this.thongtin = 'ID: ' + this.ownerObject.id + '\r' + 'Họ tên: ' + this.ownerObject.fullname + '\r' + 'Email:' + this.ownerObject.email;
      } else {
        console.log('No data of User');
        this.thongtin = 'Không tìm thấy id người đăng, vui lòng kiểm tra lại id !!!';
      }
    });
    $(document).ready(function() {
      $('#checkOwnerId').show();
    });
  }

  submit() {
    console.log('test');
    console.log(this.selectedImage);
    if (this.selectedImage !== null) {
      const  filePath = `productImages/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      console.log(filePath);
      const fileRef = this.storage.ref(filePath);
      console.log(fileRef);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.imgSrc = url;
            console.log(this.imgSrc);
            this.formArray.at(0).value.productImages.push(this.imgSrc);
          });
        })

      // finalize(async () => {
      //   //       this.downloadURL = await ref.getDownloadURL().toPromise();
      //   //       // (this.createProductForm.get('productImageList') as FormArray).push(new FormControl(this.downloadURL));
      //   //       console.log(this.downloadURL);
      //   //       this.db.collection('files').add({downloadURL: this.downloadURL, path});
      //   //     })
      ).subscribe();
    }
    console.log(this.formArray.at(0).value);
  }

  showPreview(event: any) {

    console.log(event.target.files);
    if ( event.target.files ) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.submit();
    } else {
      console.log('view')
      this.imgSrc = './../../../assets/Placeholder.jpg';
      this.selectedImage = null;
    }
  }


  // onDrop(files: FileList) {
  //   this.files.splice(0);
  //   // (this.createProductForm.get('productImageList') as FormArray).clear();
  //   for (let i = 0; i < files.length; i++) {
  //     this.files.push(files.item(i));
  //   }
  // }
  //
  // startUpload(file) {
  //   // The storage path
  //   const path = `test/${Date.now()}_${file.name}`;
  //   // Reference to storage bucket
  //   const ref = this.storage.ref(path);
  //   // The main task
  //   this.task = this.storage.upload(path, file);
  //   // Progress monitoring
  //   this.percentage = this.task.percentageChanges();
  //   this.snapshot = this.task.snapshotChanges().pipe(
  //     tap(console.log),
  //     // The file's download URL
  //     finalize(async () => {
  //       this.downloadURL = await ref.getDownloadURL().toPromise();
  //       // (this.createProductForm.get('productImageList') as FormArray).push(new FormControl(this.downloadURL));
  //       console.log(this.downloadURL);
  //       this.db.collection('files').add({downloadURL: this.downloadURL, path});
  //     })
  //   ).subscribe();
  // }
  //
  // onClick() {
  //   for(let i = 0; i < this.files.length; i++) {
  //     console.log(this.files);
  //     this.startUpload(this.files[i]);
  //   }
  // }


  // Edit product from table directly
  updateProductField(index: number, property: string, event: any) {
    const editField = event.target.textContent;
    console.log(editField);
    let categoryIdEdit;
    console.log(this.listCategory);
    if (property === 'category.name') {
      const firstProperty = property.substring(0, 8);
      console.log(firstProperty);
      const secondProperty = property.substring(9);
      console.log(secondProperty);
      for (let i = 0; i < this.listCategory.length; i++) {
        if (editField == this.listCategory[i].name) {
          categoryIdEdit = this.listCategory[i].id;
          console.log(categoryIdEdit);
        }
      }

      this.listProduct[index][firstProperty].id = categoryIdEdit;
      console.log(this.listProduct[index].category.id);
    } else {
      this.listProduct[index][property] = editField;
    }
    // let categoryIdArray = [];
    // let categoryNameArray = [];
    // for (let i = 0; i < this.listCategory)
    // this.listProduct[index].category.name
    // this.listProduct[index].category.id
    // if (property == "category.name") {
    //   let firstProperty = property.substring(0, 8);
    //   let secondProperty = property.substring(10);
    //   this.listProduct[index][firstProperty]["id"] = rateIdEdit;
    //   this.listProduct[index][firstProperty][secondProperty] = editField;
    // } else {
    //   this.users[index][property] = editField;
    // }
    // console.log(this.listProduct[id].category.name);
    // let categoryIdEditField;
    // this.listProduct[id][property] = editField;
    // console.log(this.listProduct[id]);
  }

  insertListUpdateToDb(id: number) {
    this.listProductUpdateToDb.push(id);
    console.log(this.listProductUpdateToDb);
  }

  saveListUpdateToDb() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listProductUpdateToDb.length; i++) {
      const index = this.listProductUpdateToDb[i];
      const product = this.listProduct[index];
      console.log(product);
      const productDto = new ProductDto();
      productDto.approvementStatusId = product.approvementStatus.id;
      productDto.categoryId = product.category.id;
      console.log(product.category.id);
      productDto.ownerId = product.owner.id;
      productDto.description = product.description;
      productDto.endDate = product.endDate;
      productDto.registerDate = product.registerDate;
      productDto.startDate = product.startDate;
      productDto.id = product.id;
      productDto.name = product.name;
      productDto.increaseAmount = product.increaseAmount;
      productDto.initialPrice = product.initialPrice;
      this.productsService.editProduct(productDto, productDto.id).subscribe(next => {
      });
    }
  }

  saveAll() {
    // tslint:disable-next-line:prefer-for-of
    if ( this.formArray.length > 0) {
      for (let i = 0; i < this.formArray.length; i++) {
        console.log(this.formArray.at(i).value);
        this.productsService.addProduct(this.formArray.at(i).value).subscribe(
          () => {
          }
        );
      }
      this.formArray.clear();
    } else {
      this.saveListUpdateToDb();
    }
    // window.location.reload();
  }

  checkOwner() {
    this.productServices.getOwnerById(this.formAddNewProduct.value.owner).subscribe(data => {
      if (data != null) {
        console.log(data);
        this.ownerObject = data;
        this.thongtin = 'ID: ' + this.ownerObject.id + '\r' + 'Họ tên: ' + this.ownerObject.fullname + '\r' + 'Email:' + this.ownerObject.email;
      } else {
        console.log('No data of User');
        this.thongtin = 'Không tìm thấy id người đăng, vui lòng kiểm tra lại id !!!';
      }
    });
  }

  // checkIDOwner(){
  //   this.productServices.getOwnerById(this.formAddNewProduct.value.owner).subscribe(data => {
  //     if (data == null){
  //       console.log("No data of User")
  //       $(document).ready(function(){
  //         $("#saveProduct").prop('disabled',true)
  //         });
  //     } else {
  //       console.log(data)
  //     }
  //   })
  // }

  getListCategory() {
    this.productServices.getListCategory().subscribe(data => {
      this.categoryList = data;
      // console.log(this.categoryList)
    });
  }
  getCategoryId() {
    this.productServices.getListCategory().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (this.formAddNewProduct.value.category == data[i].name) {
          // this.formAddNewProduct.value.category = data[i].id;
          // console.log( this.formAddNewProduct.value.category)
          this.category = data[i].id;
          console.log(typeof(this.category));
        }
      }
    });
  }


  addNewProduct() {
    const newProduct = {
      name: this.formAddNewProduct.value.name,
      ownerId: this.formAddNewProduct.value.owner,
      initialPrice: this.formAddNewProduct.value.initialPrice,
      increaseAmount: this.formAddNewProduct.value.increaseAmount,
      registerDate: this.formAddNewProduct.value.registerDate,
      startDate: this.formAddNewProduct.value.startDate,
      endDate: this.formAddNewProduct.value.endDate,
      // approvementStatusId: this.formAddNewProduct.value.,
      description: this.formAddNewProduct.value.description,
      categoryId: this.category
    };

    this.productServices.addNewProduct(newProduct).subscribe(data => {
      console.log( this.formAddNewProduct.value.category);
      console.log(data);
      // this.router.navigateByUrl('product/list');
    });

  }


  // editRowData(id: number) {
  //   const index = id - 1;
  //   const product = this.listProduct[index];
  //   const productDto = new ProductDto();
  //   productDto.approvementStatusId = product.approvementStatus.id;
  //   productDto.categoryId = product.category.id;
  //   productDto.ownerId = product.owner.id;
  //   productDto.description = product.description;
  //   productDto.endDate = product.endDate;
  //   productDto.registerDate = product.registerDate;
  //   productDto.startDate = product.startDate;
  //   productDto.id = product.id;
  //   productDto.name = product.name;
  //   productDto.increaseAmount = product.increaseAmount;
  //   productDto.initialPrice = product.initialPrice;
  //   console.log(productDto);
  //   this.formEditListRow.patchValue(productDto);
  //   const name1 = 'inputData' + id;
  //   const name2 = 'displayData' + id;
  //   const name3 = 'editData' + id;
  //   const name4 = 'saveData' + id;
  //   const name5 = 'cancelEdit' + id;
  //   console.log(name1);
  //   console.log(name2);
  //   $(`input[name= ${name1}]`).show();
  //   $(`input[name= ${name2}]`).hide();
  //   $(`button[name= ${name3}]`).hide();
  //   $(`button[name= ${name4}]`).show();
  //   $(`button[name= ${name5}]`).show();
  // }
  //
  // cancelEdit(id: number) {
  //   const name1 = 'inputData' + id;
  //   const name2 = 'displayData' + id;
  //   const name3 = 'editData' + id;
  //   const name4 = 'saveData' + id;
  //   const name5 = 'cancelEdit' + id;
  //   $(`input[name= ${name1}]`).hide();
  //   $(`input[name= ${name2}]`).show();
  //   $(`button[name= ${name3}]`).show();
  //   $(`button[name= ${name4}]`).hide();
  //   $(`button[name= ${name5}]`).hide();
  // }

}

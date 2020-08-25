
import { ProductImage } from './../../shared/models/product-image';
import { Product } from './../../shared/models/product';
import { EditProductComponent } from './../edit-product/edit-product.component';

import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray,FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable,Subscription} from 'rxjs';
import {ProductService} from "../../shared/services/product.service";
import {ValidateService} from "../../shared/validations/productS.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import {Category} from '../../shared/models/category';
import {CategoryService} from '../../shared/services/category.service';
import {ApprovementStatus} from '../../shared/models/Approvement-status';
import {ApprovementStatusService} from '../../shared/services/approvement.status.service';
import {ProductDto} from '../../shared/models/dtos/ProductDto'
// import {ProductServices} from '../../shared/services/productServices.service';
import * as $ from 'jquery';
declare let $:any

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
  thongtin: string;
  bsModalRef: BsModalRef;
  namePattern:string = "^[A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶỬỮỰỲỴÝỶỸ]{1}[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
              "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
              "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
  //firebase
  selectedImage: any = null;
  imgSrc: any;

  // creator Tu
  files: File[] = [];
  listProductUpdateToDb = new Array<number>();
  editField: string;
  private listProduct: Product[];
  private listCategory: Category[];
  private listApprovementStatuses: ApprovementStatus[];
  private Form: FormGroup;
  private formArray: FormArray = new FormArray([]);
  private formArrayEdit: FormArray = new FormArray([]);
  private formEditListRow: FormGroup;


  constructor(private productServices: ProductService,
              private router: Router,
              public formBuilder: FormBuilder,
              private validate: ValidateService,
              private modalService: BsModalService,
              private storage: AngularFireStorage,
              // creator Tu
              private categoryService: CategoryService,
              private approvementStatusService: ApprovementStatusService,
               ) {}
  ngOnDestroy(): void {
    
  }

  reloadData() {
    this.products = this.productServices.getProductList();
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

    //Creator Son
    this.formAddNewProduct = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern(this.namePattern)]],
      owner: ['', [Validators.required],[this.validate.validateCode(this.productServices).bind(ValidateService)]],
      category: ['', [Validators.required]],
      initialPrice: ['', [Validators.required]],
      increaseAmount: ['', [Validators.required]],
      registerDate: [this.registerDate],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })

        // creator Tu
        this.listProduct = new Array<Product>();
        this.productServices.getProductList().subscribe(next => {
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






    $(document).ready(function(){
      $("#checkten").hide();

      $("#tenSP").change(function(){
        $("#checkten").show(1000);
      });
    });


    $(document).ready(function(){
      $("#checkID").hide();

      $("#idNguoiDang").change(function(){
        $("#checkID").show(1000);
      });
    });
    $(document).ready(function(){
      $("#checkID").hide();

      $("#idNguoiDang").change(function(){
        $("#checkID").show(1000);
      });
    });

    $(document).ready(function(){
      $("#checkChungLoai").hide();

      $("#chungloai").change(function(){
        $("#checkChungLoai").show(1000);
      });
    });

    $(document).ready(function(){
      $("#checkgiabandau").hide();

      $("#giabandau").change(function(){
        $("#checkgiabandau").show(1000);
      });
    });

    $(document).ready(function(){
      $("#checkbuocgia").hide();

      $("#buocgia").change(function(){
        $("#checkbuocgia").show(1000);
      });
    });

    $(document).ready(function(){
      $("#checkhinhanh").hide();

      $("#hinhanh").change(function(){
        $("#checkhinhanh").show(1000);
      });
    });

    $(document).ready(function(){
      $("#checkngaybatdau").hide();

      $("#ngaybatdau").change(function(){
        $("#checkngaybatdau").show(1000);
      });
    });

    $(document).ready(function(){
      $("#checkngayketthuc").hide();

      $("#ngayketthuc").change(function(){
        $("#checkngayketthuc").show(1000);
      });
    });

    $(document).ready(function(){
      $("#checkthongtinchitiet").hide();

      $("#thongtinchitiet").change(function(){
        $("#checkthongtinchitiet").show(1000);
      });
    });

    $(document).ready(function(){
      $("#kiemtra").click(function(){
        console.log("Thong tin nguoi dang da dissable")
        $("#infoOwner").prop('hidden',false)
        $("#thongTinNguoiDang").prop('disabled', true)
      });
    });

      // clear form addProduct
    $('#dismiss').on('click', function (e) {
      var $t = $(this),
          target = $t[0].href || $t.data("target") || $t.parents('.modal') || [];
  
    $(target)
      .find("input,select")
         .val('')
         .end()
      .find("input[type=checkbox], input[type=radio]")
         .prop("checked", "")
         .end()
      .find("textarea")
          .prop('disabled', false)
      $("#infoOwner").prop('hidden',true)
      $("#thongTinNguoiDang").prop('disabled', false)
      .val('')
      .end();
  })

  }

  checkOwner() {
    this.productServices.getOwnerById(this.formAddNewProduct.value.owner).subscribe(data => {
      if (data != null) {
        console.log(data)
        this.ownerObject = data
        this.thongtin = "ID: " + this.ownerObject.id + "\r" + "Họ tên: " + this.ownerObject.fullname + "\r" + "Email:" + this.ownerObject.email
        $("#thongTinNguoiDang").val(this.thongtin)
      } else {
        console.log("No data of User")
        this.thongtin = "Không tìm thấy id người đăng, vui lòng kiểm tra lại id !!!"
        $("#thongTinNguoiDang").val(this.thongtin)
      }
    })
  }

  getListCategory(){
    this.productServices.getListCategory().subscribe(data=>{
      this.categoryList = data
    })
  }

  getCategoryId(){
    this.productServices.getListCategory().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        if (this.formAddNewProduct.value.category == data[i].name){
          this.category = data[i].id;
        }
      }
    })
  }


  addNewProduct() {
    let newProduct = {
      name: this.formAddNewProduct.value.name,
      ownerId: this.formAddNewProduct.value.owner,
      initialPrice: this.formAddNewProduct.value.initialPrice,
      increaseAmount: this.formAddNewProduct.value.increaseAmount,
      registerDate: this.formAddNewProduct.value.registerDate,
      startDate: this.formAddNewProduct.value.startDate,
      endDate: this.formAddNewProduct.value.endDate,
      description: this.formAddNewProduct.value.description,
      categoryId: this.category,
      productImages: this.imgSrc
    };

    this.productServices.addNewProduct(newProduct).subscribe(data => {
      console.log("Form addNew value before add new")
      console.log(data);
      this.ngOnInit()
      console.log("Addnew form was send and load ngOnInit is load")
    });

  }

  openModalWithComponent(product:any) {
    const initialState = {
      data:product ,
  };

    this.bsModalRef = this.modalService.show(EditProductComponent,{initialState,class: 'gray modal-lg'});
    this.bsModalRef.content.event.subscribe(res => {
      this.ngOnInit()
    });
  }



submit() {
  console.log('Select img');
  console.log(this.selectedImage);
  if (this.selectedImage !== null) {
    const  filePath = `productImages/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    console.log(filePath);
    const fileRef = this.storage.ref(filePath);
    // console.log(fileRef);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.imgSrc = url;
          console.log("Img url")
          console.log(this.imgSrc);
          console.log("check form addnew")
          console.log(this.formAddNewProduct.value)
          this.formAddNewProduct.value.productImages= this.imgSrc;
        });
      })
    ).subscribe();
  }
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
      productImage: ['', [Validators.required]],
      // productImages: this.formBuilder.array([]),
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







  // showPreview1(event: any) {
  //   console.log(this.formArray.at(0).value);
  // }
  submit1() {
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
      ).subscribe();
    }
    console.log(this.formArray.at(0).value);
  }

  showPreview1(event: any) {
    console.log(event.target.files);
    if ( event.target.files ) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.submit1();
    } else {
      console.log('view')
      this.imgSrc = './../../../assets/Placeholder.jpg';
      this.selectedImage = null;
    }
  }
 
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
  }

  insertListUpdateToDb(id: number) {
    this.listProductUpdateToDb.push(id);
    console.log(this.listProductUpdateToDb);
  }

  saveListUpdateToDb() {
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
      this.productServices.editProduct(productDto, productDto.id).subscribe(next => {
        this.ngOnInit();
      });
    }
  }

  saveAll() {

    if ( this.formArray.length > 0) {
      for (let i = 0; i < this.formArray.length; i++) {
        console.log(this.formArray.at(i).value);
        this.productServices.addProduct(this.formArray.at(i).value).subscribe(
          () => {
          }
        );
      }
      this.formArray.clear();
    } else {
      this.saveListUpdateToDb();
    }
  }

}

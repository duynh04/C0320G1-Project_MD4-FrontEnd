import { ProductImage } from './../../shared/models/product-image';
import { Product } from './../../shared/models/product';
import { EditProductComponent } from './../edit-product/edit-product.component';

import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductService} from "../../shared/services/product.service";
import {ValidateService} from "../../shared/validations/productS.service"
;
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

declare let $:any
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy {
  //Creator: Long
  private formSearchList: FormGroup;
  products: Observable<Product[]>;

  //Creator: Son
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


  constructor(private productServices: ProductService,
              private router: Router,
              public formBuilder: FormBuilder,
              private validate: ValidateService,
              private modalService: BsModalService,
              private storage: AngularFireStorage
               ) {}
  ngOnDestroy(): void {
    
  }

  reloadData() {
    this.products = this.productServices.getProductList();
  }

  ngOnInit() {
    //Creator: Long
    this.formSearchList = this.formBuilder.group({
      name: ['', [ Validators.pattern('^[A-Za-z0-9]{0,}$')]],
      owner: ['', [ Validators.pattern('^[A-Za-z0-9]{0,}$')]]
    });

    this.reloadData();

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
      // approvementStatus:[{id: 1, "name": "dang cho duyet" }]
    })



    // giai quyet van de ...
    $(document).ready(function(){
      $("#checkten").hide();

      $("#tenSP").change(function(){
        $("#checkten").show(1000);

        // alert("Input has been changed.");
      });
    });

    $(document).ready(function(){
      $("#checkID").hide();

      $("#idNguoiDang").change(function(){
        $("#checkID").show(1000);
        // alert("Input has been changed.");
      });
    });


    $(document).ready(function(){
      $("#checkID").hide();

      $("#idNguoiDang").change(function(){
        $("#checkID").show(1000);
        // alert("Input has been changed.");
      });
    });

    $(document).ready(function(){
      $("#checkChungLoai").hide();

      $("#chungloai").change(function(){
        $("#checkChungLoai").show(1000);
        // alert("Input has been changed.");
      });
    });

    $(document).ready(function(){
      $("#checkgiabandau").hide();

      $("#giabandau").change(function(){
        $("#checkgiabandau").show(1000);
        // alert("Input has been changed.");
      });
    });


    $(document).ready(function(){
      $("#checkbuocgia").hide();

      $("#buocgia").change(function(){
        $("#checkbuocgia").show(1000);
        // alert("Input has been changed.");
      });
    });

    $(document).ready(function(){
      $("#checkhinhanh").hide();

      $("#hinhanh").change(function(){
        $("#checkhinhanh").show(1000);
        // alert("Input has been changed.");
      });
    });

    $(document).ready(function(){
      $("#checkngaybatdau").hide();

      $("#ngaybatdau").change(function(){
        $("#checkngaybatdau").show(1000);
        // alert("Input has been changed.");
      });
    });

    $(document).ready(function(){
      $("#checkngayketthuc").hide();

      $("#ngayketthuc").change(function(){
        $("#checkngayketthuc").show(1000);
        // alert("Input has been changed.");
      });
    });

    $(document).ready(function(){
      $("#checkthongtinchitiet").hide();

      $("#thongtinchitiet").change(function(){
        $("#checkthongtinchitiet").show(1000);
        // alert("Input has been changed.");
      });
    });



    $(document).ready(function(){
      $("#kiemtra").click(function(){
        console.log("Thong tin nguoi dang da dissable")
        $("#infoOwner").prop('hidden',false)
        // $("#thongTinNguoiDang")
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
      // console.log(this.categoryList)
    })
  }
  getCategoryId(){
    this.productServices.getListCategory().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        if (this.formAddNewProduct.value.category == data[i].name){
          // this.formAddNewProduct.value.category = data[i].id;
          // console.log( this.formAddNewProduct.value.category)
          this.category = data[i].id;
          console.log(typeof(this.category))
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
      // approvementStatusId: this.formAddNewProduct.value.,
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

  //firebase
  submit() {
    console.log('Start using firebase');
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
  
  

}

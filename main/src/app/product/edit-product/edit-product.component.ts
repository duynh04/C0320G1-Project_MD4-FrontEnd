import { Category } from './../../shared/models/category';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import {ValidateService} from "../../shared/validations/productS.service"
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


declare let $:any
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})


export class EditProductComponent implements OnInit {

  formEditProduct: FormGroup;
  registerDate: Date = new Date();
  public categoryList;
  private category;
  data:any;
  data1:any;
  thongtin:string;
  ownerObject
  namePattern:string = "^[A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶỬỮỰỲỴÝỶỸ]{1}[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
  "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
  "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
  
  public event: EventEmitter<any> = new EventEmitter();

  constructor(private productServices: ProductService,
              private router: Router,
              public formBuilder: FormBuilder,
              private validate: ValidateService,
              private modalService: BsModalService,
              public bsModalRef: BsModalRef
            ) { }

  

  ngOnInit() {

    this.formEditProduct = this.formBuilder.group({
   
      name: ['', [Validators.required,Validators.pattern(this.namePattern)]],
      owner: ['', [Validators.required],[this.validate.validateCode(this.productServices).bind(ValidateService)]],
      category: ['', [Validators.required]],
      initialPrice: ['', [Validators.required]],
      increaseAmount: ['', [Validators.required]],
      // productImg:['',[Validators.required]],
      registerDate: [this.registerDate],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      // approvementStatus:[{id: 1, "name": "dang cho duyet" }]
    })
    this.productServices.getListCategory().subscribe(data=>{
      this.categoryList = data
    })
      this.data1 = Object.assign({}, this.data)
      this.data1.owner = this.data1.owner.id
      this.formEditProduct.patchValue(this.data1);


      $(document).ready(function(){
        $("#kiemtra").click(function(){
          console.log("Thong tin nguoi dang da dissable")
          $("#infoOwner").prop('hidden',false)
          // $("#thongTinNguoiDang")
          $("#thongTinNguoiDang").prop('disabled', true)
        });
      });
  
  }

  getCategoryId(){
    this.productServices.getListCategory().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        if (this.formEditProduct.value.category == data[i].name){
          this.category = data[i].id;
          console.log(typeof(this.category))
        }
      }
    })
  }

  triggerEvent() {
    console.log("value of form edit")
    console.log(this.formEditProduct.value)
    console.log(this.formEditProduct.value.owner)
    console.log(this.formEditProduct.value.category)
    let updateProduct = {
      name: this.formEditProduct.value.name,
      ownerId: this.formEditProduct.value.owner,
      initialPrice: this.formEditProduct.value.initialPrice,
      increaseAmount: this.formEditProduct.value.increaseAmount,
      registerDate: this.formEditProduct.value.registerDate,
      startDate: this.formEditProduct.value.startDate,
      endDate: this.formEditProduct.value.endDate,
      // approvementStatusId: this.formEditProduct.value.,
      description: this.formEditProduct.value.description,
      categoryId: this.formEditProduct.value.category.id
    };
    this.productServices.editProduct(updateProduct,this.data.id).subscribe()
    this.event.emit({ res:200 });
  }
  compareByID(itemOne, itemTwo) {
    return itemOne && itemTwo && itemOne.id == itemTwo.id;
  }


  checkOwner() {
    this.productServices.getOwnerById(this.formEditProduct.value.owner).subscribe(data => {
      if (data != null) {
        console.log(data)
        this.ownerObject = data
        this.thongtin = "ID: " + this.ownerObject.id + "\r" + "Họ tên: " + this.ownerObject.fullname + "\r" + "Email:" + this.ownerObject.email

      } else {
        console.log("No data of User")
        this.thongtin = "Không tìm thấy id người đăng, vui lòng kiểm tra lại id !!!"
      }
    })
  }

}

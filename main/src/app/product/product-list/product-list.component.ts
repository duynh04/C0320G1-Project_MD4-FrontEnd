import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from '../../shared/models/product';
import {ProductService} from "../../shared/services/product.service";

declare let $:any
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  //Creator: Long
  private formSearchList: FormGroup;
  products: Observable<Product[]>;

  //Creator: Son
  formAddNewProduct: FormGroup;
  registerDate: Date = new Date();
  public categoryList;
  private category;
  ownerObject;
  thongtin: String;

  constructor(private productServices: ProductService,
              private router: Router,
              public formBuilder: FormBuilder,
               ) {}

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
      name: ['', [Validators.required]],
      owner: ['', [Validators.required]],
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
        $("#thongTinNguoiDang").prop('disabled', true)
      });
    });

    

      // clear form addProduct
    $('#dismiss').on('click', function (e) {
      var $t = $(this),
          target = $t[0].href || $t.data("target") || $t.parents('.modal') || [];
  
    $(target)
      .find("input,textarea,select")
         .val('')
         .end()
      .find("input[type=checkbox], input[type=radio]")
         .prop("checked", "")
         .end();
  })

  }





  checkOwner() {
    this.productServices.getOwnerById(this.formAddNewProduct.value.owner).subscribe(data => {
      if (data != null) {
        console.log(data)
        this.ownerObject = data
        this.thongtin = "ID: " + this.ownerObject.id + "\r" + "Họ tên: " + this.ownerObject.fullname + "\r" + "Email:" + this.ownerObject.email
        $(document).ready(function(){
          $("#saveProduct").prop('disabled',true)
          });
      } else {
        console.log("No data of User")
        this.thongtin = "Không tìm thấy id người đăng, vui lòng kiểm tra lại id !!!"

        $(document).ready(function(){
          $("#saveProduct").prop('disabled',true)
          });
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
      categoryId: this.category
    };

    this.productServices.addNewProduct(newProduct).subscribe(data => {
      console.log( this.formAddNewProduct.value.category)
      console.log(data);
      // this.router.navigateByUrl('product/list');
    });

  }
  

}
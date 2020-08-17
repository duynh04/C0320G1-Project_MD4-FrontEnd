import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ProductServicesService } from "../../services/product-services.service"
import { Router,ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  formEditProduct: FormGroup;
  registerDate: Date = new Date();
  public categoryList;
  private category;
  ownerObject
  thongtin: String
  

  constructor(
    public formBuilder: FormBuilder,
    private productService: ProductServicesService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formEditProduct = this.formBuilder.group({
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
    this.activatedRoute.params.subscribe(data=>{
      console.log(data)
    })
  }
  checkOwner() {
    // console.log(this.formEditProduct.value.owner)
    this.productService.getOwnerById(this.formEditProduct.value.owner).subscribe(data => {
      if (data != null) {
        console.log(data)
        this.ownerObject = data
        this.thongtin = "ID: " + this.ownerObject.id + "\r" + "Họ tên: " + this.ownerObject.fullname + "\r" + "Email:" + this.ownerObject.email
      }
    })
  }
  getListCategory(){
    this.productService.getListCategory().subscribe(data=>{
      this.categoryList = data
    })
  }
  getCategoryId(){
    this.productService.getListCategory().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        if (this.formEditProduct.value.category == data[i].name){
          this.category = data[i].id;
        }
      }
    })
  }


  addNewProduct() {

    let newProduct = {
      name: this.formEditProduct.value.name,
      ownerId: this.formEditProduct.value.owner,
      initialPrice: this.formEditProduct.value.initialPrice,
      increaseAmount: this.formEditProduct.value.increaseAmount,
      registerDate: this.formEditProduct.value.registerDate,
      startDate: this.formEditProduct.value.startDate,
      endDate: this.formEditProduct.value.endDate,
      // approvementStatusId: this.formEditProduct.value.,
      description: this.formEditProduct.value.description,
      categoryId: this.category
    }

    this.productService.addNewProduct(newProduct).subscribe(data => {
      console.log( this.formEditProduct.value.category)
      console.log(data);
      // this.router.navigate("");
    });
  }

}

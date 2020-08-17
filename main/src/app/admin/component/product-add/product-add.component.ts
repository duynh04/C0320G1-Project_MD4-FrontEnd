import { Observable } from 'rxjs';
import { Category } from './../../../shared/models/category';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ProductServicesService } from "../../services/product-services.service"
import { Router } from '@angular/router'
import { JsonPipe } from '@angular/common';



@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  formAddNewProduct: FormGroup;
  registerDate: Date = new Date();
  public categoryList;
  private category;
  ownerObject
  thongtin: String
  

  constructor(
    public formBuilder: FormBuilder,
    private productService: ProductServicesService,
    public router: Router
  ) { }

  ngOnInit() {
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
  }
  checkOwner() {
    // console.log(this.formAddNewProduct.value.owner)
    this.productService.getOwnerById(this.formAddNewProduct.value.owner).subscribe(data => {
      if (data != null) {
        console.log(data)
        this.ownerObject = data
        this.thongtin = "ID: " + this.ownerObject.id + "\r" + "Họ tên: " + this.ownerObject.fullname + "\r" + "Email:" + this.ownerObject.email
      }
      console.log("No data of User")
    })
  }
  getListCategory(){
    this.productService.getListCategory().subscribe(data=>{
      this.categoryList = data
      // console.log(this.categoryList)
    })
  }
  getCategoryId(){
    this.productService.getListCategory().subscribe(data=>{
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
    // this.productService.getListCategory().subscribe(data=>{

    //   for(let i=0;i<data.length;i++){
    //     if (data[i].name == this.formAddNewProduct.value.category){
    //       this.formAddNewProduct.value.category = data[i]
    //     }
    //   } 

    // })`
    // console.log(this.formAddNewProduct.value.owner)
    // this.productService.getOwnerById(this.formAddNewProduct.value.owner).subscribe(data => {
    //   console.log(data)

    //   this.formAddNewProduct.value.owner = data;

    
    // });

    // console.table(this.formAddNewProduct.value)
    // this.productService.addNewProduct(this.formAddNewProduct.value).subscribe(data =>{
    //   console.log("haha")
    //   console.log(data);
    //   // this.router.navigate("");
    // })

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
    }

    this.productService.addNewProduct(newProduct).subscribe(data => {
      console.log( this.formAddNewProduct.value.category)
      console.log(data);
      // this.router.navigate("");
    });
  }

}

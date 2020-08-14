import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import {ProductServicesService} from "../../services/product-services.service"
import {Router} from '@angular/router'



@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  formAddNewProduct: FormGroup;
  registerDate: Date = new Date();

  constructor(
    public formBuilder: FormBuilder,
    private productService: ProductServicesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.formAddNewProduct = this.formBuilder.group({
      name:['',[Validators.required]],
      owner:['',[Validators.required]],
      category:['',[Validators.required]],
      initialPrice:['',[Validators.required]],
      increaseAmount:['',[Validators.required]],
      // productImg:['',[Validators.required]],
      registerDate: [this.registerDate],
      startDate:['',[Validators.required]],
      endDate:['',[Validators.required]],
      description:['',[Validators.required]],
    })
  }
  addNewProduct(){
    console.log(this.registerDate)
    console.table(this.formAddNewProduct.value)
    this.productService.addNewProduct(this.formAddNewProduct.value).subscribe(data =>{
      console.log(this.formAddNewProduct);
      // this.router.navigate("");
    })
  }

}

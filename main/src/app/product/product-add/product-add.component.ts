import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl, FormArray,
  FormBuilder, FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../shared/services/product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { PRODUCT_MESSAGES } from '../../shared/validations/error-messages';
import { UserValidatorService } from '../../shared/validations/user-validator.service';
import { validCompareDate, validDate, validMaxImage } from '../../shared/validations/custom-validators';
import { TokenStorageService } from '../../auth/token-storage.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private userValidatorService: UserValidatorService,
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private tokenStorageService: TokenStorageService) {
  }

  // Thành
  createProductForm: FormGroup;
  categoriesList;
  files: File[] = [];
  errors = PRODUCT_MESSAGES;
  task: AngularFireUploadTask;
  minDate = new Date();

  percentage: Observable<number>;
  snapshot: Subscription;
  downloadURL: string;
  newProduct: any;


  // Lựa chọn file để upload, lựa xong push vào mảng. Nếu chọn sai chọn lại thì xóa mảng làm lại từ đầu
  onDrop(files: FileList) {
    this.files.splice(0);
    (this.createProductForm.get('productImageList') as FormArray).clear();
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  ngOnInit() {
    this.createProductForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      name: ['', [Validators.required, Validators.pattern('^[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]{1}[ a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$')]],
      initialPrice: ['', [Validators.required, Validators.min(0)]],
      increaseAmount: ['', [Validators.required, Validators.min(0)]],
      date: this.fb.group({
        startDate: ['', [validDate]],
        endDate: ['', [validDate]]
      }, {
        validators: [validCompareDate]
      }),
      // tslint:disable-next-line:max-line-length
      description: ['', [Validators.required, Validators.maxLength(250)]],
      category: this.fb.group({
        id: ['', Validators.required]
      }),
      productImageList: this.fb.array([], [Validators.required, validMaxImage]),
      registerDate: [''],
      owner: this.fb.group({
        id: [this.tokenStorageService.getJwtResponse().userId]
      })
    });
    this.categoryService.getCategoriesList().subscribe(data => {
      this.categoriesList = data;
    });
  }

  onSubmit() {
    let from = new DatePipe('vi-VN').transform(this.createProductForm.value.date.startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", 'GMT+7');
    let to = new DatePipe('vi-VN').transform(this.createProductForm.value.date.endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", 'GMT+7');
    let _registerDate = new DatePipe('vi-VN').transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", 'GMT+7');
    this.newProduct = {
      name: this.createProductForm.value.name,
      initialPrice: this.createProductForm.value.initialPrice,
      increaseAmount: this.createProductForm.value.increaseAmount,
      registerDate: _registerDate,
      startDate: from,
      endDate: to,
      description: this.createProductForm.value.description,
      category: this.createProductForm.value.category,
      owner: this.createProductForm.value.owner,
      productImages: []
    }
      ;
    (this.createProductForm.get('productImageList') as FormArray).controls.forEach(val => {
      this.newProduct.productImages.push({ link: val.value });
    });
    console.log(this.newProduct);
    this.productService.createProduct(this.newProduct).subscribe(
      data => {
        this.router.navigateByUrl('product/myProduct');
      }
    );
  }

  // Click để upload ảnh, có bao nhiêu ảnh thì chạy bấy nhiêu lần chỉ với 1 nút bấm
  onClick() {
    for (let i = 0; i < this.files.length; i++) {
      console.log(this.files);
      this.startUpload(this.files[i]);
    }
  }

  // Hàm upload ảnh lên server
  startUpload(file) {
    // The storage path

    const path = `test/${Date.now()}_${file.name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path);
    // The main task
    this.task = this.storage.upload(path, file);
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        (this.createProductForm.get('productImageList') as FormArray).push(new FormControl(this.downloadURL));
        console.log(this.downloadURL);
        this.db.collection('files').add({ downloadURL: this.downloadURL, path });
      })
    ).subscribe();
  }

  get name() {
    return this.createProductForm.get('name');
  }

  get initialPrice() {
    return this.createProductForm.get('initialPrice');
  }

  get increaseAmount() {
    return this.createProductForm.get('increaseAmount');
  }

  get date() {
    return this.createProductForm.get('date') as FormGroup;
  }

  get description() {
    return this.createProductForm.get('description');
  }

  get category() {
    return this.createProductForm.get('category.id');
  }

  get from() {
    return this.createProductForm.get('date.startDate');
  }

  get to() {
    return this.createProductForm.get('date.endDate');
  }

  get productImageList(): FormArray {
    return this.createProductForm.get('productImageList') as FormArray;
  }
}

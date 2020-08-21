import {Component, Input, OnInit} from '@angular/core';
import {
  AbstractControl, FormArray,
  FormBuilder, FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {finalize, tap} from 'rxjs/operators';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable, Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {PRODUCT_MESSAGES} from '../../shared/validations/error-messages';
import {UserValidatorService} from '../../shared/validations/user-validator.service';
import {validMaxImage} from "../../shared/validations/custom-validators";


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
              private db: AngularFirestore) {
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
    return this.createProductForm.get('category');
  }

  get from() {
    return this.createProductForm.get('date.startDate');
  }

  get to() {
    return this.createProductForm.get('date.endDate');
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
      name: ['', [Validators.required, Validators.pattern('^[A-Z]{1}[ a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$')]],
      initialPrice: ['', [Validators.required, Validators.min(0)]],
      increaseAmount: ['', [Validators.required, Validators.min(0)]],
      date: this.fb.group({
        startDate: ['', [this.userValidatorService.date]],
        endDate: ['', [this.userValidatorService.date]]
      }, {
        validators: [this.userValidatorService.compare('date')]
      }),
      // tslint:disable-next-line:max-line-length
      description: ['', [Validators.required, Validators.pattern('^[A-Z]{1}[ a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$')]],
      category: this.fb.group({
        id: ['', Validators.required]
      }),
      productImageList: this.fb.array([], [Validators.required, validMaxImage]),
      registerDate: [''],
    });
    this.categoryService.getCategoriesList().subscribe(data => {
      this.categoriesList = data;
    });
  }

  onSubmit() {
    this.newProduct = {
        name: this.createProductForm.value.name,
        initialPrice: this.createProductForm.value.initialPrice,
        increaseAmount: this.createProductForm.value.increaseAmount,
        registerDate: new Date(),
        startDate: this.createProductForm.value.date.startDate,
        endDate: this.createProductForm.value.date.endDate,
        description: this.createProductForm.value.description,
        category: this.createProductForm.value.category,
        productImageList: []
      }
    ;
    (this.createProductForm.get('productImageList') as FormArray).controls.forEach(val => {
      this.newProduct.productImageList.push({link : val.value});
    });
    console.log(this.newProduct);
    this.productService.createProduct(this.newProduct).subscribe(
      data => {
        this.router.navigateByUrl('product');
        alert('Đã gửi yêu cầu đấu giá thành công. Vui lòng chờ phê duyệt!');
      }
    );
  }

  onClick() {
    for(let i = 0; i < this.files.length; i++) {
      console.log(this.files);
      this.startUpload(this.files[i]);
    }
  }

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
        this.db.collection('files').add({downloadURL: this.downloadURL, path});
      })
    ).subscribe();
  }
}

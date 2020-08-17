import {Component, Input, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormControl,
  ValidationErrors
} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {finalize, tap} from 'rxjs/operators';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {DELIVERRY_MESSAGES} from '../../shared/validations/error-messages';
import {UserValidatorService} from '../../shared/validations/user-validator.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  createProductForm: FormGroup;
  createProductFormCopy: FormGroup;
  categoriesList;
  files: File[] = [];
  file: File;
  dateRegister = new Date();
  errors = DELIVERRY_MESSAGES;
  task: AngularFireUploadTask;
  minDate = new Date();

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  //
  // dateValidator(control: AbstractControl) {
  //   const startDate = new Date(control.get('starDate').value).getTime();
  //   const endDate = new Date(control.get('endDate').value).getTime();
  //   return (endDate < startDate) ? {date: true} : null;
  // }

  onDrop(files: FileList) {
      this.files.splice(0, );
      for (let i = 0; i < files.length; i++) {
        this.files.push(files.item(i));
      }
      console.log(files);
    }
  constructor(private fb: FormBuilder,
              private userValidatorService: UserValidatorService,
              private productService: ProductService,
              private router: Router,
              private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private db: AngularFirestore) {
  }

  ngOnInit() {
    this.createProductForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      name: ['', [Validators.required, Validators.pattern('^[A-Z]{1}[ a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$')]],
      initialPrice: ['', [Validators.required, Validators.min(0)]],
      increaseAmount: ['', Validators.required],
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
      productImageList: this.fb.group({
        link: [this.downloadURL]
      }),
      registerDate: [this.minDate]
    });
    this.categoryService.getCategoriesList().subscribe(data => {
      this.categoriesList = data;
    });
  }
  onSubmit() {
    this.productService.createProduct(this.createProductForm.value).subscribe(
      data => {
        this.startUpload();
        console.log('Onsubmit');
        this.router.navigateByUrl('product');
        alert('Đã gửi yêu cầu đấu giá thành công. Vui lòng chờ phê duyệt!');
      }
    );
  }
  startUpload() {
    // The storage path
    const path = `test/${Date.now()}_${this.file}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async () =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        console.log(this.downloadURL);
        this.db.collection('files').add( { downloadURL: this.downloadURL, path });
      })
    );
    this.snapshot.subscribe();
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

}

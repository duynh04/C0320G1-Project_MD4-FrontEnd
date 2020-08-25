import {Component, OnInit} from '@angular/core';
import {DealManageService} from '../../shared/services/deal-manage.service';
import {Subscription} from 'rxjs';
import { DealDTO } from 'src/app/shared/models/deal-manage';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-deal-manage',
  templateUrl: './deal-manage.component.html',
  styleUrls: ['./deal-manage.component.css'],
})
export class DealManageComponent implements OnInit {

  private dealList: DealDTO[];
  private pageSize: number = 10;
  private lastPage: number;
  private currentPage: number;
  private commandToPagination: string;

  private idsToDelete: number[] = [];
  private idsNotAllowToDelete: number[] = [];
  private checkbox: any;

  private createForm: FormGroup;
  private message: string;

  private interval: any;
  private subscription: Subscription = new Subscription();

  constructor(
    public dealManageService: DealManageService,
    private httpClient: HttpClient,
  ) {}

  ngOnInit() {
    this.reloadData(1, this.pageSize, 'list');
    this.commandToPagination = 'list';
    this.createForm = new FormGroup({
      nameSeller: new FormControl('', Validators.pattern('[ A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]{1,}')),
      nameBuyer: new FormControl('', Validators.pattern('[ A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]{1,}')),
      nameProduct: new FormControl('', Validators.pattern('[ A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]{1,}')),
      totalPayment: new FormControl('', [Validators.min(1), Validators.pattern('[0-9]{1,}')]),
      statusOfDeal: new FormControl(''),
    });

    // this.httpClient
    //   .get('http://localhost:8080/api/v1/admin/deal-management')
    //   .toPromise()
    //   // .then( resp => console.log('Success writed by Thao', resp))
    //   .catch(err => {
    //     this.message = 'Lỗi kết nối server';
    //   });
  }

  reloadData(page, pageSize, commandToPagination) {
    // load data for list
    if ( commandToPagination === 'list' ) {
      this.dealManageService.getOnePage(page, pageSize).subscribe(data => {
        this.dealList = data.items;
        this.currentPage = data.currentPage;
        this.lastPage = data.totalPage;
        this.message = 'Danh sách hiện thời có ' + data.totalItems + ' giao dịch';
        console.log(this.commandToPagination);
      });
    // load data for search
      } else if ( commandToPagination === 'search' ) {
        if (this.createForm.value.totalPayment === '' ) {
          this.createForm.patchValue({totalPayment: 1});
        }
        this.dealManageService.search(this.createForm.value, page, pageSize)
          .pipe(map(value => JSON.parse(value)))
          .subscribe(data => {
            if (data === null) {
              this.dealList = null;
              this.message = 'Không tìm thấy dữ liệu khớp với tìm kiếm';
            }
            this.dealList =  data.items;
            this.currentPage = data.currentPage;
            this.lastPage = data.totalPage;
            this.message = 'Có ' + data.totalItems + ' kết quả được tìm thấy';
            console.log(data);
            console.log(this.commandToPagination);
          });
      }
  }

  // delete function
  checkCheckBoxes(): any {
    this.idsToDelete = [];
    this.idsNotAllowToDelete = [];
    this.checkbox = document.getElementsByClassName('checkthis');
    for (let i in this.checkbox) {
      if (this.checkbox[i].checked) {
        if ( this.dealList.find(x => x.id == this.checkbox[i].defaultValue ).statusOfDeal != 'Đang chờ thanh toán' ) {
          this.idsToDelete.push(Number(this.checkbox[i].defaultValue));
        } else {
          this.idsNotAllowToDelete.push(Number(this.checkbox[i].defaultValue));
        }
      }
    }
    this.reloadData(1, this.pageSize, this.commandToPagination);
    return this.idsToDelete;
  }

  deleteDeals(): void {
    this.dealManageService.setDealsIsDeleted(this.idsToDelete)
      .subscribe(data => {
        this.interval = setInterval(() => {
          this.reloadData(1, this.pageSize, this.commandToPagination);
          this.stopReload();
        }, 100);
        console.log(data);
      });
  }

  stopReload() {
    this.subscription.unsubscribe();
    clearInterval(this.interval);
  }

  // search by fields function
  searchDeals(): void {
    this.commandToPagination = 'search';
    console.log(this.commandToPagination);
    if ( this.createForm.valid ) {
      this.reloadData(1, this.pageSize, this.commandToPagination);
      this.createForm.patchValue({totalPayment: ''});
    } else {
      this.message = 'Vui lòng nhập đúng thông tin hợp lệ để tìm kiếm';
    }
  }

  // pagination function
  goFirstPage() {
    console.log(this.commandToPagination);
    this.reloadData(1, this.pageSize, this.commandToPagination);
  }

  goPreviousPage() {
    console.log(this.commandToPagination);
    if (this.currentPage > 1) {
      return this.reloadData(this.currentPage - 1, this.pageSize, this.commandToPagination);
    }
  }

  goNextPage() {
    console.log(this.commandToPagination);
    if (this.currentPage < this.lastPage) {
      return this.reloadData(this.currentPage + 1, this.pageSize, this.commandToPagination);
    }
  }

  goLastPage() {
    console.log(this.commandToPagination);
    this.reloadData(this.lastPage, this.pageSize, this.commandToPagination);
  }

  // set color for field Tình trạng giao dịch
  setColorFieldStatusOfDeal(status) {
    if (status === 'Thành công') {
      return 'text-success';
    } else if (status === 'Thất bại') {
      return 'text-muted';
    } else if (status === 'Đang chờ thanh toán') {
      return 'text-danger';
    }
  }

}

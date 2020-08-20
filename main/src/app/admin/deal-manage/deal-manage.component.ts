import {Component, OnInit} from '@angular/core';
import {DealManageService} from '../../shared/services/deal-manage.service';
import {Observable, Subscription} from 'rxjs';
import { DealDTO } from 'src/app/shared/models/deal-manage';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-deal-manage',
  templateUrl: './deal-manage.component.html',
  styleUrls: ['./deal-manage.component.css'],
})
export class DealManageComponent implements OnInit {

  private dealList: Observable<DealDTO[]>;
  private pageSize: number = 10;
  private lastPage: number;
  private currentPage: number;

  private arrayIdToDelete: number[] = [];
  private checkbox: any;

  private createForm: FormGroup;
  private searchMessage: string;
  private commandToPagination: string;

  private interval: any;
  private subscription: Subscription = new Subscription();

  constructor(
    public dealManageService: DealManageService,
  ) {}

  ngOnInit() {
    this.reloadData(1, this.pageSize, 'paginationOfList');
    this.createForm = new FormGroup({
      nameSeller: new FormControl('', Validators.pattern('[ A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]{1,}')),
      nameBuyer: new FormControl('', Validators.pattern('[ A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]{1,}')),
      nameProduct: new FormControl('', Validators.pattern('[ A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]{1,}')),
      totalPayment: new FormControl('', [Validators.min(1), Validators.pattern('[0-9]{1,}')]),
      statusOfDeal: new FormControl(''),
    });
    this.commandToPagination = 'paginationOfList';
  }

  reloadData(page, pageSize, commandToPagination) {
    if ( commandToPagination === 'paginationOfList' ) {
      this.dealManageService.getOnePage(page, pageSize).subscribe(data => {
        this.dealList = data.items;
        this.currentPage = data.currentPage;
        this.lastPage = data.totalPage;
        this.searchMessage = 'Danh sách hiện thời có ' + data.totalItems + ' giao dịch';
        console.log(this.commandToPagination);
      });
      } else if ( commandToPagination === 'paginationOfSearchList' ) {
        if (this.createForm.value.totalPayment === '' ) {
          this.createForm.patchValue({totalPayment: 1});
        }
        this.dealManageService.search(this.createForm.value, page, pageSize)
          .pipe(map(value => JSON.parse(value)))
          .subscribe(data => {
            if (data === null) {
              this.dealList = null;
              this.searchMessage = 'Không tìm thấy dữ liệu khớp với tìm kiếm';
            }
            this.dealList =  data.items;
            this.currentPage = data.currentPage;
            this.lastPage = data.totalPage;
            this.searchMessage = 'Có ' + data.totalItems + ' kết quả được tìm thấy';
            console.log(data);
            console.log(this.commandToPagination);
          });
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

  // delete function
  checkCheckBoxes(): any {
    this.arrayIdToDelete = [];
    this.checkbox = document.getElementsByClassName('checkthis');
    for (let i = 0; i < this.checkbox.length; i++) {
      if (this.checkbox[i].checked) {
        this.arrayIdToDelete.push(Number(this.checkbox[i].defaultValue));
      }
    }
    console.log(this.arrayIdToDelete);
    this.reloadData(1, this.pageSize, this.commandToPagination);
    return this.arrayIdToDelete;
  }

  deleteDeals(): void {
    this.dealManageService.setDealsIsDeleted(this.arrayIdToDelete)
      .subscribe(data => {
        this.interval = setInterval(() => {
          this.stopReload();
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

  //search by fields function
  searchDeals(): void {
    this.commandToPagination = 'paginationOfSearchList';
    console.log(this.commandToPagination);
    if ( this.createForm.valid ) {
      this.reloadData(1, this.pageSize, this.commandToPagination);
      this.createForm.patchValue({totalPayment: ''});
    } else {
      this.searchMessage = 'Vui lòng nhập đúng thông tin hợp lệ để tìm kiếm';
    }
  }

  // set color for field Tình trạng giao  dịch
  setcolorFieldStatusOfDeal(status) {
    if (status === 'Thành công') {
      return 'text-success';
    } else if (status === 'Thất bại') {
      return 'text-muted';
    } else if (status === 'Đang chờ thanh toán') {
      return 'text-danger';
    }
  }
}

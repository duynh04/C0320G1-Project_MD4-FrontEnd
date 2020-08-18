import {Component, Input, OnInit} from '@angular/core';
import {DealManageService} from '../../shared/services/deal-manage.service';
import {Observable} from 'rxjs';
import { DealDTO } from 'src/app/shared/models/deal-manage';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-deal-manage',
  templateUrl: './deal-manage.component.html',
  styleUrls: ['./deal-manage.component.css']
})
export class DealManageComponent implements OnInit {
  public dealList: Observable<DealDTO[]>;
  public lastPage: number;
  public currentPage: number;
  public previousCurrentPage: number;
  public nextCurrentPage: number;

  arrayIdToDelete: number[] = [];
  private checkbox: any;
  private createForm: FormGroup;

  constructor(
    public dealManageService: DealManageService,
  ) {
  }

  ngOnInit() {
    this.reloadData(1, 5);
    this.createForm = new FormGroup({
      nameSeller: new FormControl('', Validators.pattern('[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ_]{1,}')),
      nameBuyer: new FormControl('', Validators.pattern('[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ_]{1,}')),
      nameProduct: new FormControl('', Validators.pattern('[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ_]{1,}')),
      totalPayment: new FormControl('', [Validators.min(1), Validators.pattern('[0-9]{1,}')]),
      statusOfDeal: new FormControl(''),
    });
  }

  reloadData(page, pageSize) {
    this.dealManageService.getOnePage(page, pageSize).subscribe(data => {
      this.currentPage = page;
      this.dealList = data.items;
      this.lastPage = data.totalPage;
      // if(this.currentPage > 1) {
      //   this.previousCurrentPage = this.currentPage - 1;
      // } else {
      //   document.getElementById("previousCurrentPage").style.visibility = "hidden";
      // }

      // if(this.currentPage < this.lastPage) {
      //   this.nextCurrentPage = this.currentPage + 1;
      // }else {
      //   document.getElementById("nextCurrentPage").style.visibility = "hidden";
      // }
    });
  }

  // pagination
  goFirstPage() {
    this.reloadData(1, 5);
  }

  goPreviousPage() {
    console.log(this.currentPage);
    if (this.currentPage > 1) {
      return this.reloadData(this.currentPage - 1, 5);
    }
  }

  goNextPage() {
    console.log(this.currentPage);
    if (this.currentPage < this.lastPage) {
      return this.reloadData(this.currentPage + 1, 5);
    }
  }

  goLastPage() {
    this.reloadData(this.lastPage, 5);
  }

  //delete
  checkCheckBoxes(): any {
    this.arrayIdToDelete = [];
    this.checkbox = document.getElementsByClassName('checkthis');
    for (let i = 0; i < this.checkbox.length; i++) {
      if (this.checkbox[i].checked) {
        this.arrayIdToDelete.push(Number(this.checkbox[i].defaultValue));
      }
    }
    console.log(this.arrayIdToDelete);
    return this.arrayIdToDelete;
  }

  setDeleteDeals(): void {
    this.dealManageService.deleteDeals(this.arrayIdToDelete);
    // for (let i = 0; i < this.arrayIdToDelete.length; i++) {
    //   this.dealManageService.deleteOneDealById(this.arrayIdToDelete[i]);
    //   console.log('row ' + (i + 1) + ' đã xóa id' + this.arrayIdToDelete[i]);
    // }
    this.reloadData(1, 5);
  }

  //search by fields
  search() {
    if ( this.createForm.valid ) {
      console.table(this.createForm.value);
      this.dealManageService.search(this.createForm.value).subscribe(data => {
        this.currentPage = data.page;
        this.dealList = data.items;
        this.lastPage = data.totalPage;
        console.log(data);
      });
    }
  }
}

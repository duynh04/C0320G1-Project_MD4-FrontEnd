import {Component, Input, OnInit} from '@angular/core';
import {DealManageService} from '../../shared/services/deal-manage.service';
import {Observable} from 'rxjs';
import { DealDTO } from 'src/app/shared/models/deal-manage';

@Component({
  selector: 'app-deal-manage',
  templateUrl: './deal-manage.component.html',
  styleUrls: ['./deal-manage.component.css']
})
export class DealManageComponent implements OnInit {
  public dealList: Observable<DealDTO[]>;
  public dealListToDelete: DealDTO[];
  public lastPage: number;
  public currentPage: number;
  public previousCurrentPage: number;
  public nextCurrentPage: number;

  arrayIdToDelete: number[] = [];

  constructor(
    public dealManageService: DealManageService,
  ) { }

  ngOnInit() {
    this.reloadData(1, 5);
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

  checkCheckBoxes(): void {
    this.arrayIdToDelete = [];
    const checkbox = document.getElementsByClassName('checkthis');
    for ( let i = 0 ; i < checkbox.length; i++ ) {
      if (checkbox[i].checked ) {
        console.log(i + ' là ' + checkbox[i].defaultValue);
        this.arrayIdToDelete.push(Number(checkbox[i].defaultValue));
      }
    }
    console.log(this.arrayIdToDelete);
    this.dealManageService.deleteDeals(this.arrayIdToDelete);

  }

  setDeleteDeals() : void {
    this.dealManageService.deleteDeals(this.arrayIdToDelete);
  }

}

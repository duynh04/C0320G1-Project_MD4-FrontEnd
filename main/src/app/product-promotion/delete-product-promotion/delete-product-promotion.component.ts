import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductPromotionService} from '../../shared/services/product-promotion.service';

@Component({
  selector: 'app-delete-product-promotion',
  templateUrl: './delete-product-promotion.component.html',
  styleUrls: ['./delete-product-promotion.component.css']
})
export class DeleteProductPromotionComponent implements OnInit {
  private content;
  private id;

  constructor(
    public dialogRef: MatDialogRef<DeleteProductPromotionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productPromotionService: ProductPromotionService
  ) {
  }

  ngOnInit(): void {
    this.content = this.data.data1.content;
    this.id = this.data.data1.id;
  }

  deleteStudent() {
    this.productPromotionService.deleteProductPromotion(this.id).subscribe(data => {
      this.dialogRef.close();
    });
  }

}

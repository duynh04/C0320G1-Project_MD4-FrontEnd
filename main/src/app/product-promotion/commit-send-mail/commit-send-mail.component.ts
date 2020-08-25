import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductPromotionService} from '../../shared/services/product-promotion.service';
import {Router} from '@angular/router';

declare let Email: any;

@Component({
  selector: 'app-commit-send-mail',
  templateUrl: './commit-send-mail.component.html',
  styleUrls: ['./commit-send-mail.component.css']
})
export class CommitSendMailComponent implements OnInit {
  private amount;
  private name;
  usersEmail;

  constructor(
    private productPromotionService: ProductPromotionService,
    private router: Router,
    public dialogRef: MatDialogRef<CommitSendMailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.amount = this.data.length;
    this.name = this.data.name;
    this.productPromotionService.getUserList().subscribe(data => {
      this.usersEmail = data;
    });
  }
  gotoList() {
    this.router.navigateByUrl('/productPromotion');
  }

  submitSendMail() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.usersEmail.length; i++) {
      Email.send({
        Host: 'smtp.elasticemail.com',
        Username: 'thong220700@gmail.com',
        Password: 'EB79B477DC0EAD8F1B62D27C2019ADAD8B0C',
        To: this.usersEmail[i].email,
        From: 'thong220700@gmail.com',
        Subject: 'khuyến mãi',
        Body: 'Body'
      }).then(message => {
      });
      console.log(this.usersEmail[i].email);
    }
    this.dialogRef.close();
  }


}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommentLevel1Service } from '../../shared/services/comment-level1.service';
import { CommentLevel1 } from '../../shared/models/comment-level1';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {
  public commentForm: FormGroup;
  // tslint:disable-next-line:ban-types
  public commentInfo: Array<Object> = [];
  // tslint:disable-next-line:ban-types
  public submmitted: Boolean = false;
  public id = 0;
  public commentLevel1User: CommentLevel1[];
  public commentLevel1Id: number;
  @Output() userComment = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private commentLevel1Service: CommentLevel1Service,
    private router: Router,
  ) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(1000)]]
    });
  }

  addNewCommentLevel1() {
    this.commentLevel1Service.addNewCommentLevel1(this.commentForm.value).subscribe(data => {
      this.router.navigateByUrl('auction/product-details/1');
    });
    alert('Bình luận của bạn đã đăng thành công');
  }

  onSubmit() {
    this.submmitted = true;
    if (this.commentForm.invalid) {
      return false;
    } else {
      this.commentInfo.push({
        commentId: this.id++,
        currentDate: new Date(),
        user: this.commentLevel1User,
        commentTxt: this.commentForm.controls.content.value,
        replyComment: []
      });
      this.userComment.emit(this.commentInfo);
    }
  }
}

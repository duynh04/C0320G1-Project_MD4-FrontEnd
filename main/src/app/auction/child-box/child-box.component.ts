import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentLevel2Service } from '../../shared/services/comment-level2.service';
import { CommentLevel2 } from '../../shared/models/comment-level2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-child-box',
  templateUrl: './child-box.component.html',
  styleUrls: ['./child-box.component.css']
})
export class ChildBoxComponent implements OnInit {
  public childForm: FormGroup;
  public replyComment: Array<object> = [];
  // tslint:disable-next-line:ban-types
  public submitted: Boolean = false;
  public commentLevel2User: CommentLevel2[];
  public commentLevel2Id: number;
  @Output() userReplyComment = new EventEmitter();
  @Output() deleteNo = new EventEmitter();
  @Input() commentNo: any;

  constructor(
    private formBuilder: FormBuilder,
    private commentLevel2Service: CommentLevel2Service,
    private router: Router
  ) { }

  ngOnInit() {
    this.childForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });

    this.commentLevel2Service.getAllCommentLevel2().subscribe(data => {
      this.commentLevel2User = data;
    });

    console.log('Comment No ==>', this.commentNo);
  }

  addNewCommentLevel2() {
    this.commentLevel2Service.addNewCommentLevel2(this.childForm.value).subscribe(data => {
      this.router.navigateByUrl('auction/product-details/1');
    });
    alert('Trả lời bình luận của bạn đã đăng thành công');
  }

  onSubmit() {
    this.submitted = true;
    if (this.childForm.invalid) {
      return false;
    } else {
      this.replyComment.push({
        currentDate: new Date(),
        user: this.commentLevel2User,
        commentTxt: this.childForm.controls.content.value
      });
      this.userReplyComment.emit(this.replyComment);
      this.deleteNo.emit(this.commentNo);
    }
  }
}

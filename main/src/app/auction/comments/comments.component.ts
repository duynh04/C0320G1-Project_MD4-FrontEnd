import {
  Component, OnInit, Input, Output, OnChanges, EventEmitter,
  Directive, ViewContainerRef, ViewChildren, QueryList, ComponentFactoryResolver
} from '@angular/core';
import { CommentLevel1Service } from '../../shared/services/comment-level1.service';
import { ChildBoxComponent } from '../child-box/child-box.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dataContainer]'
})
export class DataContainerDirective {
  constructor(
    public viewContainerRef: ViewContainerRef
  ) {
  }
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges {
  @Input() postComment: Array<object> = [];
  @Output() countComments = new EventEmitter();
  public loadComponent = false;
  public commentIndex = 0;
  public reply: Array<object> = [];

  @ViewChildren (DataContainerDirective) entry: QueryList<DataContainerDirective>;

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.postComment !== undefined) {
      console.log('Main array====>', this.postComment);
    }
  }

  removeComment(no) {
    this.postComment.splice(no, 1);
    console.log('After remove array====>', this.postComment);
    this.countComments.emit(this.postComment);
  }

  replyComment(index) {
    this.loadComponent = true;
    const myFactory = this.resolver.resolveComponentFactory(ChildBoxComponent);
    if (this.entry.toArray()[index].viewContainerRef.length <= 0 ) {
      const myRef = this.entry.toArray()[index].viewContainerRef.createComponent(myFactory);
      myRef.instance.commentNo = index;
      myRef.changeDetectorRef.detectChanges();
      // @ts-ignore
      myRef.instance.userReplyComment.subscribe(
        data => {
          console.log('Piyali=>', data);
          this.receiveReplyComment(data, index);
        }
      );
      // @ts-ignore
      myRef.instance.deleteNo.subscribe(
        no => {
          myRef.destroy();
        }
      );
    }
  }

  receiveReplyComment($event, i) {
    this.reply = $event;
    console.log($event);
    this.postComment.forEach((element) => {
      // @ts-ignore
      if (element.commentId === i) {
        // @ts-ignore
        element.replyComment.push(...$event);
        console.log('Main array after reply comment=>', this.postComment);
      }
    });
    console.log(this.reply);
    this.loadComponent = false;
  }
}

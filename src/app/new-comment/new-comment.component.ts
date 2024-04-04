import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommentsService } from '../comments/comments.service';
import { Comment, User } from '../shared/comment.model';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
})
export class NewCommentComponent implements OnInit {
  currentUser!: User;

  @Input() replyingTo = '';

  @ViewChild('commentInput', { static: false }) commentInputRef: ElementRef;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.currentUser = this.commentsService.currentUser;
  }

  onSendComment() {
    this.commentsService.addComment(
      new Comment(
        this.commentsService.count + 1,
        this.commentInputRef.nativeElement.value,
        new Date().toDateString(),
        0,
        this.commentsService.currentUser,
        []
      )
    );
    this.commentInputRef.nativeElement.value = '';
  }

  onSendReply() {
    console.log('reply');
    this.replyingTo = '';
  }
}

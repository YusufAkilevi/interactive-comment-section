import { Component, Input, OnInit } from '@angular/core';

import { Comment, User } from '../shared/comment.model';
import { CommentsService } from '../comments/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;

  currentUser: User;
  isCurrentUser: boolean;
  replyingTo!: number;
  replyingToUser: string;
  showReply: boolean;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.currentUser = this.commentsService.currentUser;
    this.isCurrentUser =
      this.comment.user.username === this.currentUser.username;
  }

  onVote(voteType: string) {
    this.commentsService.voteComments(voteType, this.comment.id);
  }

  onClickReply() {
    this.replyingTo = this.comment.id;
    this.replyingToUser = this.comment.user.username;
    this.showReply = !this.showReply;
  }
}

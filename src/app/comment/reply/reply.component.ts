import { Component, Input, OnInit } from '@angular/core';

import { Reply } from '../../shared/reply.model';
import { User } from '../../shared/comment.model';
import { CommentsService } from '../../comments/comments.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent implements OnInit {
  @Input() reply!: Reply;

  currentUser: User;
  isCurrentUser: boolean;
  showReply: boolean;
  replyingToUser: string;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.currentUser = this.commentsService.currentUser;
    this.isCurrentUser = this.currentUser.username === this.reply.user.username;
  }

  onClickReply() {
    this.showReply = !this.showReply;
    this.replyingToUser = this.commentsService.getUserReplyingTo(this.reply.id);
  }

  onVote(voteType: string) {
    this.commentsService.voteComments(voteType, this.reply.id);
  }
}

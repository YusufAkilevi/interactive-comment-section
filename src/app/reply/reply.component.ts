import { Component, Input, OnInit } from '@angular/core';

import { Reply } from '../shared/reply.model';
import { User } from '../shared/comment.model';
import { CommentsService } from '../comments/comments.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent implements OnInit {
  @Input() reply!: Reply;

  currentUser: User;
  isCurrentUser: boolean;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.currentUser = this.commentsService.currentUser;
    this.isCurrentUser = this.currentUser.username === this.reply.user.username;
  }
}

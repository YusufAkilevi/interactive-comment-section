import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../comments/comments.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
})
export class NewCommentComponent implements OnInit {
  currentUser!: { image: { png: string; webp: string }; username: string };

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.currentUser = this.commentsService.currentUser;
  }
}

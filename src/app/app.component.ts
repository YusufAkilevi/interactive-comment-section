import { Component, OnChanges, OnInit } from '@angular/core';
import { CommentsService } from './comments/comments.service';
import { Comment } from './shared/comment.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  comments: Comment[] = [];

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.comments = this.commentsService.comments;
  }
}

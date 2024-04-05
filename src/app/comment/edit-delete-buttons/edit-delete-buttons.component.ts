import { Component, Input } from '@angular/core';
import { CommentsService } from 'src/app/comments/comments.service';

@Component({
  selector: 'app-edit-delete-buttons',
  templateUrl: './edit-delete-buttons.component.html',
  styleUrls: ['./edit-delete-buttons.component.scss'],
})
export class EditDeleteButtonsComponent {
  @Input() replyId: number;

  constructor(private commentsService: CommentsService) {}

  onDelete() {
    this.commentsService.removeComment(this.replyId);
  }
}

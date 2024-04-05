import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommentsService } from '../comments/comments.service';
import { Comment, User } from '../shared/comment.model';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
})
export class NewCommentComponent implements OnInit {
  currentUser!: User;
  showReply: boolean;

  @Input() replyingTo: number;
  @Input() replyingToUser: string;
  @Output() showReplyEvent = new EventEmitter<boolean>();

  @ViewChild('commentInput', { static: false }) commentInputRef: ElementRef;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.currentUser = this.commentsService.currentUser;
  }

  ngAfterViewInit() {
    this.commentInputRef.nativeElement.focus();
  }

  onSendComment() {
    this.commentsService.addComment(this.commentInputRef.nativeElement.value);
    this.commentInputRef.nativeElement.value = '';
  }

  onSendReply() {
    const reply = this.commentInputRef.nativeElement.value
      .split(' ')
      .slice(1)
      .join(' ');

    this.commentsService.addReply(reply, this.replyingTo, this.replyingToUser);
    this.showReplyEvent.emit(false);
  }
}

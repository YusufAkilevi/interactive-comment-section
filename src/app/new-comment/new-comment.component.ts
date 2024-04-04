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
import { Reply } from '../shared/reply.model';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
})
export class NewCommentComponent implements OnInit {
  currentUser!: User;
  showReply: boolean;

  @Input() replyingTo: Comment | Reply;
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
    this.commentsService.addReplyToComment(
      new Reply(
        this.commentsService.count + 1,
        'Haloo',
        new Date().toDateString(),
        0,
        this.commentsService.currentUser,
        this.replyingTo.user.username
      ),
      this.replyingTo
    );
    this.showReplyEvent.emit(false);
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reply-button',
  templateUrl: './reply-button.component.html',
  styleUrls: ['./reply-button.component.scss'],
})
export class ReplyButtonComponent {
  @Output() clickEvent = new EventEmitter();

  onReply() {
    this.clickEvent.emit();
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommentComponent } from './comment/comment.component';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { ReplyComponent } from './comment/reply/reply.component';
import { EditDeleteButtonsComponent } from './comment/edit-delete-buttons/edit-delete-buttons.component';
import { ReplyButtonComponent } from './comment/reply-button/reply-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    NewCommentComponent,
    ReplyComponent,
    EditDeleteButtonsComponent,
    ReplyButtonComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

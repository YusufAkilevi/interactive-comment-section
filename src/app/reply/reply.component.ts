import { Component, Input } from '@angular/core';

import { Reply } from '../shared/reply.model';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent {
  @Input() reply!: Reply;

  constructor() {
    console.log(this.reply);
  }
}

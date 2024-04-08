import { Injectable } from '@angular/core';

import { Comment } from '../shared/comment.model';
import { Reply } from '../shared/reply.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  comments = [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: '1 month ago',
      score: 12,
      user: {
        image: {
          png: '../../assets/images/avatars/image-amyrobson.png',
          webp: '../../assets/images/avatars/image-amyrobson.webp',
        },
        username: 'amyrobson',
      },
      replies: [
        {
          id: 5,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: '1 week ago',
          score: 4,
          replyingTo: 'maxblagun',
          user: {
            image: {
              png: '../../assets/images/avatars/image-ramsesmiron.png',
              webp: '../../assets/images/avatars/image-ramsesmiron.webp',
            },
            username: 'ramsesmiron',
          },
        },
      ],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: '2 weeks ago',
      score: 5,
      user: {
        image: {
          png: '../../assets/images/avatars/image-maxblagun.png',
          webp: '../../assets/images/avatars/image-maxblagun.webp',
        },
        username: 'maxblagun',
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: '1 week ago',
          score: 4,
          replyingTo: 'maxblagun',
          user: {
            image: {
              png: '../../assets/images/avatars/image-ramsesmiron.png',
              webp: '../../assets/images/avatars/image-ramsesmiron.webp',
            },
            username: 'ramsesmiron',
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: '2 days ago',
          score: 2,
          replyingTo: 'ramsesmiron',
          user: {
            image: {
              png: '../../assets/images/avatars/image-juliusomo.png',
              webp: '../../assets/images/avatars/image-juliusomo.webp',
            },
            username: 'juliusomo',
          },
        },
      ],
    },
  ];

  currentUser = {
    image: {
      png: '../../assets/images/avatars/image-juliusomo.png',
      webp: './images/avatars/image-juliusomo.webp',
    },
    username: 'juliusomo',
  };

  count = 5;

  constructor() {}

  addComment(newComment: string) {
    this.comments.push(
      new Comment(
        this.count + 1,
        newComment,
        new Date().toDateString(),
        0,
        this.currentUser,
        []
      )
    );
    this.count++;
  }

  addReply(reply: string, replyingToId: number, replyingTo: string) {
    const newReply = new Reply(
      this.count + 1,
      reply,
      new Date().toDateString(),
      0,
      this.currentUser,
      replyingTo
    );
    this.count++;

    const parentComment = this.comments.find((comment) => {
      if (comment.id === replyingToId) {
        return comment;
      } else if (comment.replies.length > 0) {
        const isReplyingTo = comment.replies.some(
          (reply) => reply.id === replyingToId
        );

        return isReplyingTo ? comment : false;
      } else {
        return false;
      }
    });
    parentComment?.replies.push(newReply);
  }

  removeComment(commentId: number) {
    this.comments.find((comment, i) => {
      if (comment.id === commentId) {
        return this.comments.splice(i, 1);
      } else {
        comment.replies.find((reply, i) => {
          if (reply.id === commentId) {
            return comment.replies.splice(i, 1);
          } else {
            return false;
          }
        });
        return false;
      }
    });
  }

  voteComments(voteType: string, commentId: number) {
    const vote = (voteType: string, comment: Comment | Reply | undefined) => {
      if (voteType === 'up') {
        if (comment) comment.score++;
      } else {
        if (comment) comment.score--;
      }
    };

    this.comments.find((comment) => {
      if (comment.id === commentId) {
        vote(voteType, comment);
      } else {
        comment.replies.find((reply) => {
          if (reply.id === commentId) {
            vote(voteType, reply);
          }
        });
      }
    });

    this.comments.sort((a: Comment, b: Comment) => b.score - a.score);
  }

  getUserReplyingTo(replyId: number) {
    for (let comment of this.comments) {
      if (comment.id === replyId) {
        return comment.user.username;
      } else if (comment.replies.length > 0) {
        for (let reply of comment.replies) {
          if (reply.id === replyId) {
            return reply.user.username;
          }
        }
      } else {
        return '';
      }
    }
    return '';
  }
}

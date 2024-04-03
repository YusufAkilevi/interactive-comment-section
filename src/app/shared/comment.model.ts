import { Reply } from './reply.model';

export type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export class Comment {
  constructor(
    public id: number,
    public content: string,
    public createdAt: string,
    public score: number,
    public user: User,
    public replies: Reply[]
  ) {}
}

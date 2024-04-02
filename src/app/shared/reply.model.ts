export class Reply {
  constructor(
    public id: number,
    public content: string,
    public createdAt: string,
    public score: number,
    public user: {
      image: {
        png: string;
        webp: string;
      };
      username: string;
    },
    public replyingTo: string
  ) {}
}

export class Post {
  constructor(
    public post: string,
    public userId?: string,
    public userImage?: string,
    public userProfile?: string,
    public incognito?: string,
    public scopeLimited?: string,
    public postImage?: [{
      filepath: string,
      webviewPath: string,
    }],
    public postedDate?: string,
    public isActive?: string,
    public status?: string,
    public hands?: [{}],
    public providers?: [{}]
  ){}
}

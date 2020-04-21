export class Post {
  constructor(
    public post: string,
    public userId?: string,
    public userImage?: string,
    public userName?: string,
    public incognito?: string,
    public scopeLimited?: string,
    public postImages?: [{}],
    public postedDate?: string,
    public isActive?: string,
    public status?: string,
    public hands?: [{}],
    public providers?: [{}]
  ){}
}

export class User {

  constructor(
    public userProfile: string,
    public email: string,
    public password: string,
    public tandc?: boolean,
    public userName?: string,
    public google?: boolean,
    public userImage?: string,
    public resetToken?: string,
    public dateBirth?: string,
    public dateCreated?: string,
    public lastUpdated?: string,
    public sessionId?: string,
    public gender?: string,
    public follows?: [],
    public ownedBus?: [],
    public active?: string,
    public city?: string,
    public state?: string,
    public phone?: string,
    public twitterURL?: string,
    public instagramURL?: string,
    public linkedinURL?: string,
    public facebookURL?: string,
    public website?: string,
    public location?: {},
    public licensedProducts?: [{}],
    public filesLocation?: string,
    public _id?: string,
    public newPassword?: string,
    public socketId?: string
    ) {}

}

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Subscription, of } from 'rxjs';

import { User } from 'src/app/models/user.model';
import { Post } from 'src/app/models/post.model';

import { urlService } from '../../config/config';

import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit, OnDestroy {


  userSubs: Subscription;
  tokenSubs: Subscription;
  user: User;
  token: string;
  posts: any;
  urlBind = urlService;

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  constructor(
    public router: Router,
    public _userService: UserService,
    public postService: PostService

  ) { }

  ngOnInit() {
    this.userSubs =  this._userService.user.subscribe( userData => {
      this.user = userData;
    });

    this.tokenSubs = this._userService.token.subscribe( tokenId => {
      this.token = tokenId;
    });

    this.getAllPosts();

  }

  getAllPosts() {
    this.postService.getPosts(this.token, this.user._id).subscribe( posts => {
      this.posts = posts;
      this.posts.reverse();
      console.log(this.posts);

    }, error => console.log('Error: ' + error));

  }


  makeOffer(id: string) {
    this.router.navigate(['/', 'pages', 'tabs', 'feed', 'raise-hand', id]);
  }

  manualFeedRefresh(event: any) {
    console.log('Begin async operation');
    this.getAllPosts();
    event.target.complete();
    console.log('Finish async operation');
  }

  loadData(event: any) {

    // aqui va la lógica para llamar llamar más posts desde el back o desde una var aqui
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

    }, 1000);
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
    this.tokenSubs.unsubscribe();
  }

}

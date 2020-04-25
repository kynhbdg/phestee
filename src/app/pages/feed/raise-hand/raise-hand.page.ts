import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

import { urlService } from 'src/app/config/config';

import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-raise-hand',
  templateUrl: './raise-hand.page.html',
  styleUrls: ['./raise-hand.page.scss'],
})
export class RaiseHandPage implements OnInit, OnDestroy {

  postId: string;
  post: Post;
  tokenSubs: Subscription;
  token: string;
  postTextHdr = '';
  urlBind = urlService;

  constructor(
    public router: Router,
    public http: HttpClient,
    private activeRoute: ActivatedRoute,
    public postService: PostService,
    public _userService: UserService
    ) { }

  ngOnInit() {

    this.tokenSubs = this._userService.token.subscribe( tokenId => {
      this.token = tokenId;
    }, error => console.log('Error: ' + error));

    this.activeRoute.params.subscribe( postId => {
      this.getPostbyId(this.token, postId.postId);
    }, error => console.log('Error: ' + error));

  }

  getPostbyId(token: string, postId: string) {
    this.postService.getPostbyPostId(token, postId).subscribe( res => {
      this.post = res.post[0];
      this.postTextHdr = this.post.post;
      console.log(this.post);
    }, error => console.log('Error: ' + error));
  }

  ngOnDestroy() {
    this.tokenSubs.unsubscribe();
  }



}


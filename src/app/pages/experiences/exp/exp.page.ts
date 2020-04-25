import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Post } from 'src/app/models/post.model';

import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

import { urlService } from 'src/app/config/config';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.page.html',
  styleUrls: ['./exp.page.scss'],
})
export class ExpPage implements OnInit, OnDestroy {

  postId: string;
  post: Post;
  tokenSubs: Subscription;
  token: string;
  postTextHdr = '';
  urlBind = urlService;

  constructor(
    public router: Router,
    public actionSheetController: ActionSheetController,
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
      this.getPostbyId(this.token, postId.expId);
    }, error => console.log('Error: ' + error));

  }

  getPostbyId(token: string, postId: string) {
    this.postService.getPostbyPostId(token, postId).subscribe( res => {
      this.post = res.post[0];
      this.postTextHdr = this.post.post;
    }, error => console.log('Error: ' + error));
  }

  navigateInfo(id: string) {
    this.router.navigate(['/', 'pages', 'tabs', 'experiences', 'exp-info' ,  id]);
  }

  onOpenExperience(id: string) {
    this.router.navigate(['/', 'exp-chat', id]);
  }

  ngOnDestroy() {
    this.tokenSubs.unsubscribe();
  }

}

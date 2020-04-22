import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { ExpPage } from './exp/exp.page';

import { urlService } from '../../config/config';

import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.page.html',
  styleUrls: ['./experiences.page.scss'],
})
export class ExperiencesPage implements OnInit, OnDestroy {

  showActiveFlg = true;
  token: string;
  user: User;
  incPostSubs: Subscription;
  userSubs: Subscription;
  tokenSubs: Subscription;
  userPosts: any = [];
  urlBind = urlService;

  constructor(
    public router: Router,
    public modalController: ModalController,
    public postService: PostService,
    public _userService: UserService
  ) { }

  ngOnInit() {

    this.userSubs =  this._userService.user.subscribe( userData => {
        this.user = userData;
    });

    this.tokenSubs = this._userService.token.subscribe( tokenId => {
      this.token = tokenId;
    });

    // we need a service to source post by User ID, it is not avail in backend  right now, I'm using getPosts but fitering by _id
    this.postService.getPostsByUserID(this.token, this.user._id).subscribe( data => {
      this.userPosts = data;
      this.userPosts.reverse();
      this.addIncrementalPost();
      console.log(this.userPosts);
    });

  }

  addIncrementalPost() {
    this.incPostSubs = this.postService.getIncPost.subscribe( (incrementalPost: any) => {
      if (!incrementalPost || incrementalPost.post.length === 0) {
        return;
      }
      const newPost = incrementalPost.post[0];
      this.userPosts.unshift(newPost);
    });
  }


  experienceStatusToggle(event: any) {
    this.showActiveFlg = event.detail.value === 'done' ? false : true ;
    // this.displayBlockStyle = this.showActiveFlg === true || false ? true : true;
  }

  displayExpStyle(event: any) {
    // this.displayBlockStyle = event.detail.value === 'list' ? false : true;
  }

  onOpenPost(id: string) {
    console.log(id);
    this.router.navigate(['/', 'pages', 'tabs', 'experiences', id]);
  }

  ngOnDestroy() {
    this.incPostSubs.unsubscribe();
    this.userSubs.unsubscribe();
    this.tokenSubs.unsubscribe();
  }


}

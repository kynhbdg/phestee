import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { ExpPage } from './exp/exp.page';

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
  displayBlockStyle = true;
  token: string;
  user: User;
  incPostSubs: Subscription;
  userSubs: Subscription;
  tokenSubs: Subscription;

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

    this.incPostSubs = this.postService.getIncPost.subscribe( lastPost => {
      console.log(lastPost);
    });

    this.postService.getPostsByUserID(this.token, this.user._id).subscribe( data => {
      console.log(data);
    })

  }

  experienceStatusToggle(event: any) {
    this.showActiveFlg = event.detail.value === 'done' ? false : true ;
    this.displayBlockStyle = this.showActiveFlg === true || false ? true : true;
  }

  displayExpStyle(event: any) {
    this.displayBlockStyle = event.detail.value === 'list' ? false : true;
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

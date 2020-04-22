import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Bus } from 'src/app/models/bus.model';
import { User } from 'src/app/models/user.model';

import { UserService } from 'src/app/services/user.service';
import { urlService } from 'src/app/config/config';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit, AfterViewInit {

  user: User;
  bus: Bus;
  userSubs: Subscription;
  ownedBus: Array<Bus>;
  urlBind = urlService;

  constructor(
    public router: Router,
    public _userService: UserService,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.userSubs =  this._userService.user.subscribe( userData => {
      this.user = userData;
      this.ownedBus = this.user.ownedBus;
    });

  }

  openBoard(id: string) {
    this.router.navigate(['/', 'pages', 'tabs', 'user', 'board', id]);
  }

  onAddNewBusiness() {
    this.router.navigate(['/', 'pages', 'tabs', 'user', 'business-new']);
  }

}

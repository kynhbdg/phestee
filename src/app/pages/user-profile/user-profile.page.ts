import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
export class UserProfilePage implements OnInit, AfterViewInit, OnDestroy {

  user: User;
  bus: Bus;
  token: string;
  userSubs: Subscription;
  tokenSubs: Subscription;
  userBsnsSubs: Subscription;
  urlBind = urlService;
  userBusns: any = [];

  constructor(
    public router: Router,
    public _userService: UserService,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {

    this.userSubs =  this._userService.user.subscribe( userData => {
      this.user = userData;
      this.userBusns = userData.ownedBus.reverse();
      this.addIncrementalBus();
    }, error => console.log('Error: ' + error));

    this.tokenSubs = this._userService.token.subscribe( tokenId => {
      this.token = tokenId;
    }, error => console.log('Error: ' + error));

  }


  ngAfterViewInit() {

  }

  addIncrementalBus() {
    this.userBsnsSubs = this._userService.incBus.subscribe( (incrementalBus: any) => {
      if (!incrementalBus) {
        return;
      }
      this.userBusns = incrementalBus.reverse();
    }, error => console.log('Error: ' + error));
  }

  // curateBusAttr(busArray: Array<Bus>) {
  //   const curatedBus = busArray;

  //   for ( const bus of curatedBus ) {
  //     if ( bus.rtmMode && bus.rtmMode === 0 ) {
  //       bus.rtmMode.toString() = 'Fijo';

  //     }
  //   }

  // }


  openBoard(id: string) {
    this.router.navigate(['/', 'pages', 'tabs', 'user', 'board', id]);
  }

  onAddNewBusiness() {
    this.router.navigate(['/', 'pages', 'tabs', 'user', 'business-new']);
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
    this.tokenSubs.unsubscribe();
    this.userBsnsSubs.unsubscribe();
  }

}

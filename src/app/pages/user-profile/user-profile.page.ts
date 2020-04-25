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
      this.curateBusAttr();
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
      this.curateBusAttr();
    }, error => console.log('Error: ' + error));
  }

  curateBusAttr() {
    const curatedBus = this.userBusns;

    if (curatedBus.length === 0 ) { return; }

    if ( this.userBusns.length === 1 || this.userBusns.length > 1 ) {

      for ( const bus of curatedBus ) {
         if (bus.busType === 0) {bus.busType = 'Negocio'; }
         if (bus.busType === 1) {bus.busType = 'Freelancer'; }
         if (bus.busType === 2) {bus.busType = 'Comunidad'; }
         if (bus.busType === 3) {bus.busType = 'Oficio'; }
      }
      for ( const bus of curatedBus ) {
         if (bus.rtmMode === 0) {bus.rtmMode = 'Fijo'; }
         if (bus.rtmMode === 1) {bus.rtmMode = 'Ambulante'; }
         if (bus.rtmMode === 2) {bus.rtmMode = 'Con servicio a domicilio'; }
      }
      this.userBusns = curatedBus;

    }

  }


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

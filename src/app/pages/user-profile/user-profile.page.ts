import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  constructor(
    public router: Router,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
  }

  openBoard(id: string) {
    this.router.navigate(['/', 'pages', 'tabs', 'user', 'board', id]);
  }

  onAddNewBusiness() {
    this.router.navigate(['/', 'pages', 'tabs', 'user', 'business-new']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  openBoard(id: string) {
    console.log(id);
    this.router.navigate(['/', 'pages', 'tabs', 'board', id]);
  }

}

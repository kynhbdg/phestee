import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  makeOffer(id: string) {
    this.router.navigate(['/', 'pages', 'tabs', 'feed', 'raise-hand', id]);
  }

}

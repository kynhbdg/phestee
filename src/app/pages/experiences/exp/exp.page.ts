import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.page.html',
  styleUrls: ['./exp.page.scss'],
})
export class ExpPage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  navigateInfo(id: string) {
    this.router.navigate(['/', 'pages', 'tabs', 'experiences', 'exp-info' ,  id]);
  }

}

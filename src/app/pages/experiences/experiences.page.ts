import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ExpPage } from './exp/exp.page';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.page.html',
  styleUrls: ['./experiences.page.scss'],
})
export class ExperiencesPage implements OnInit {

  showActiveFlg = true;

  constructor(
    public router: Router,
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  experienceStatusToggle(event: any) {
    console.log(event.detail.value);
    if (event.detail.value === 'done') {
      this.showActiveFlg = false;
      console.log(this.showActiveFlg);
    }
    if (event.detail.value === 'wip') {
      this.showActiveFlg = true;
      console.log(this.showActiveFlg);
    }
  }

  openExp(id: string) {
    console.log(id);
    this.router.navigate(['/', 'pages', 'tabs', 'experiences', id]);
  }

}

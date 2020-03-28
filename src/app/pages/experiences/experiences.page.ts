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
  displayBlockStyle = true;

  constructor(
    public router: Router,
    public modalController: ModalController
  ) { }

  ngOnInit() {
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

}

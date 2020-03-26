import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostModalPage } from '../modals/post-modal/post-modal.page';
import { Router, NavigationEnd, RouterEvent, ActivationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

  iconFeed = '';
  iconExperiences = '';
  iconChats = '';

  constructor(
    private modalController: ModalController,
    private router: Router
   ) { }

  ngOnInit() {

    this.router.events.subscribe( ( event: RouterEvent ) => {
      if ( event instanceof ActivationEnd ) {
        this.activateMenu();
      }
    });

  }

  activateMenu() {
    this.iconFeed = this.router.url === '/pages/tabs/feed' ? 'albums' : 'albums-outline';
    this.iconExperiences = this.router.url === '/pages/tabs/experiences' ? 'flash' : 'flash-outline';
    this.iconChats = this.router.url === '/pages/tabs/chats' ? 'chatbubbles' : 'chatbubbles-outline';
  }

  openModalPost() {
    this.modalController.create({
      component: PostModalPage
    }).then( (modalElement ) => {
      modalElement.present();
    });
  }

}

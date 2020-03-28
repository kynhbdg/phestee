import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.page.html',
  styleUrls: ['./exp.page.scss'],
})
export class ExpPage implements OnInit {

  sliderConfigOffer = {
    slidesPerView: 1.35
  };


  constructor(
    public router: Router,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
  }

  navigateInfo(id: string) {
    this.router.navigate(['/', 'pages', 'tabs', 'experiences', 'exp-info' ,  id]);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Lámparas de Guadalajara',
      buttons: [{
        text: 'Reportar',
        role: 'destructive',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Declinar oferta',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  onOpenExperience(id: string) {
    this.router.navigate(['/', 'exp-chat', id]);
  }

}

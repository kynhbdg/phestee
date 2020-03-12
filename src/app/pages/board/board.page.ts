import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {

  showBoardActiveFlg = true;

  constructor(
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Tableros',
      buttons: [{
        text: '@lavadoAutos',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: '@legalCos',
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

  boardStatusToggle(event: any) {
    console.log(event.detail.value);
    if (event.detail.value === 'done') {
      this.showBoardActiveFlg = false;
      console.log(this.showBoardActiveFlg);
    }
    if (event.detail.value === 'wip') {
      this.showBoardActiveFlg = true;
      console.log(this.showBoardActiveFlg);
    }
  }



}

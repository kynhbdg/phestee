import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-exp-chat-info',
  templateUrl: './exp-chat-info.page.html',
  styleUrls: ['./exp-chat-info.page.scss'],
})
export class ExpChatInfoPage implements OnInit {

  startExpFlag = false;
  acceptOfferFlag = false;
  endExpFlag = false;

  constructor(
    public alertController: AlertController
  ) { }

  ngOnInit() {


   }

  async confirmAcceptOffer(event: any) {
    if (event.value) {
      const alert = await this.alertController.create({
      header: 'Aceptar oferta',
      // tslint:disable-next-line: max-line-length
      message: 'Al aceptar la oferta estás de acuerdo con el precio, lugar, fecha, y cualquier termino y condición inherente a ésta experiencia. Puedes proponer cambiar la fecha y el lugar y se actualizará cuando el colaborador haya aceptado.',
      buttons: ['Cancelar', 'Continuar']
    });
      await alert.present();
    }
    return;
  }

}

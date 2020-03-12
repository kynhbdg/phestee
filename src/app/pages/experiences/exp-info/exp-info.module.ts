import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpInfoPageRoutingModule } from './exp-info-routing.module';

import { ExpInfoPage } from './exp-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpInfoPageRoutingModule
  ],
  declarations: [ExpInfoPage]
})
export class ExpInfoPageModule {}

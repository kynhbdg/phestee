import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpChatInfoPageRoutingModule } from './exp-chat-info-routing.module';

import { ExpChatInfoPage } from './exp-chat-info.page';
import { ModalsPageModule } from '../../modals/modals.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpChatInfoPageRoutingModule,
    ModalsPageModule
  ],
  declarations: [ExpChatInfoPage]
})
export class ExpChatInfoPageModule {}

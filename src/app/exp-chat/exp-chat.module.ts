import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpChatPageRoutingModule } from './exp-chat-routing.module';

import { ExpChatPage } from './exp-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpChatPageRoutingModule
  ],
  declarations: [ExpChatPage]
})
export class ExpChatPageModule {}

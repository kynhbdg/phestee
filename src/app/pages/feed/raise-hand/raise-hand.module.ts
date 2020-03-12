import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaiseHandPageRoutingModule } from './raise-hand-routing.module';

import { RaiseHandPage } from './raise-hand.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaiseHandPageRoutingModule
  ],
  declarations: [RaiseHandPage]
})
export class RaiseHandPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessSettingsPageRoutingModule } from './business-settings-routing.module';

import { BusinessSettingsPage } from './business-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessSettingsPageRoutingModule
  ],
  declarations: [BusinessSettingsPage]
})
export class BusinessSettingsPageModule {}
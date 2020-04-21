import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessSettingsPageRoutingModule } from './business-settings-routing.module';
import { ModalsPageModule } from '../../../modals/modals.module';

import { BusinessSettingsPage } from './business-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BusinessSettingsPageRoutingModule,
    ModalsPageModule
  ],
  declarations: [BusinessSettingsPage]
})
export class BusinessSettingsPageModule {}

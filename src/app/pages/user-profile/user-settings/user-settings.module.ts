import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { UserSettingsPageRoutingModule } from './user-settings-routing.module';
import { ModalsPageModule } from '../../../modals/modals.module';

import { UserSettingsPage } from './user-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UserSettingsPageRoutingModule,
    ModalsPageModule,
  ],
  declarations: [UserSettingsPage]
})
export class UserSettingsPageModule {}

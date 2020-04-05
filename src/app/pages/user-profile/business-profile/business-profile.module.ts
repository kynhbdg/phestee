import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessProfilePageRoutingModule } from './business-profile-routing.module';

import { BusinessProfilePage } from './business-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BusinessProfilePageRoutingModule
  ],
  declarations: [BusinessProfilePage]
})
export class BusinessProfilePageModule {}

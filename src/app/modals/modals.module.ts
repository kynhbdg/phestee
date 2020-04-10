import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalsPageRoutingModule } from './modals-routing.module';

import { ModalsPage } from './modals.page';

import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';

@NgModule({
  declarations: [
    ModalsPage,
    LocationPickerComponent,
    MapModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalsPageRoutingModule
  ],
  exports: [
    LocationPickerComponent,
    MapModalComponent
  ],
  entryComponents: [
    MapModalComponent
  ]
})
export class ModalsPageModule {}

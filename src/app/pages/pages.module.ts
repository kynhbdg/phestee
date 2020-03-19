import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesPageRoutingModule } from './pages-routing.module';
import { PagesPage } from './pages.page';
import { PostModalPageModule } from '../modals/post-modal/post-modal.module';
import { ModalsPageModule } from '../modals/modals.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesPageRoutingModule,
    ModalsPageModule,
    PostModalPageModule
  ],
  declarations: [PagesPage]
})
export class PagesPageModule {}

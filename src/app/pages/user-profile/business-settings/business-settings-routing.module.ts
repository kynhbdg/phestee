import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessSettingsPage } from './business-settings.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessSettingsPageRoutingModule {}

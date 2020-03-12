import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessProfilePage } from './business-profile.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessProfilePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaiseHandPage } from './raise-hand.page';

const routes: Routes = [
  {
    path: '',
    component: RaiseHandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaiseHandPageRoutingModule {}

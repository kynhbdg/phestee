import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpInfoPage } from './exp-info.page';

const routes: Routes = [
  {
    path: '',
    component: ExpInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpInfoPageRoutingModule {}

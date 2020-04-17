import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginguardGuard } from '../services/loginguard.guard';

import { ModalsPage } from './modals.page';

const routes: Routes = [
  {
    path: '',
    component: ModalsPage
  },
  // {
  //   path: 'post-modal',
  //   canActivate: [LoginguardGuard],
  //   loadChildren: () => import('./post-modal/post-modal.module').then( m => m.PostModalPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalsPageRoutingModule {}

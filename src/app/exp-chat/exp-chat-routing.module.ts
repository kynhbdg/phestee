import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginguardGuard } from '../services/loginguard.guard';

import { ExpChatPage } from './exp-chat.page';

const routes: Routes = [
  {
    path: '',
    component: ExpChatPage
  },
  {
    path: 'exp-chat-info/:id',
    canActivate: [LoginguardGuard],
    loadChildren: () => import('./exp-chat-info/exp-chat-info.module').then( m => m.ExpChatInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpChatPageRoutingModule {}

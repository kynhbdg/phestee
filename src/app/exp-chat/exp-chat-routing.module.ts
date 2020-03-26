import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpChatPage } from './exp-chat.page';

const routes: Routes = [
  {
    path: '',
    component: ExpChatPage
  },
  {
    path: 'exp-chat-info/:id',
    loadChildren: () => import('./exp-chat-info/exp-chat-info.module').then( m => m.ExpChatInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpChatPageRoutingModule {}

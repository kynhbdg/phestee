import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpChatInfoPage } from './exp-chat-info.page';

const routes: Routes = [
  {
    path: '',
    component: ExpChatInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpChatInfoPageRoutingModule {}

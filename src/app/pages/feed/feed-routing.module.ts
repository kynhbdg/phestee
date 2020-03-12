import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedPage } from './feed.page';

const routes: Routes = [
  {
    path: '',
    component: FeedPage
  },
  {
    path: 'raise-hand/:postId',
    loadChildren: () => import('./raise-hand/raise-hand.module').then( m => m.RaiseHandPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedPageRoutingModule {}

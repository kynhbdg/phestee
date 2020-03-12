import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoPage } from './info.page';

const routes: Routes = [
  {
    path: '',
    component: InfoPage
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'tyc',
    loadChildren: () => import('./tyc/tyc.module').then( m => m.TycPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'faqs',
    loadChildren: () => import('./faqs/faqs.module').then( m => m.FaqsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoPageRoutingModule {}

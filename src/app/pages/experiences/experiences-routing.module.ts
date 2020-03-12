import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExperiencesPage } from './experiences.page';

const routes: Routes = [
  {
    path: '',
    component: ExperiencesPage,
  },
  {
    path: ':expId',
    loadChildren: () => import('./exp/exp.module').then( m => m.ExpPageModule)
  },
  {
    path: 'exp-info/:expId',
    loadChildren: () => import('./exp-info/exp-info.module').then( m => m.ExpInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExperiencesPageRoutingModule {}

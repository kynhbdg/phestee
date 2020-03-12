import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfilePage } from './user-profile.page';

const routes: Routes = [
  {
    path: '',
    component: UserProfilePage
  },
  {
    path: 'user-settings',
    loadChildren: () => import('./user-settings/user-settings.module').then( m => m.UserSettingsPageModule)
  },
  {
    path: 'business-profile',
    loadChildren: () => import('./business-profile/business-profile.module').then( m => m.BusinessProfilePageModule)
  },
  {
    path: 'business-settings',
    loadChildren: () => import('./business-settings/business-settings.module').then( m => m.BusinessSettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfilePageRoutingModule {}

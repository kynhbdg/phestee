import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: PagesPage,
    children: [
      {
        path: 'feed',
        children: [
          {
            path: '',
            loadChildren: () => import('./feed/feed.module').then( m => m.FeedPageModule)
          }
        ]
      },
      {
        path: 'experiences',
        children: [
          {
            path: '',
            loadChildren: () => import('./experiences/experiences.module').then( m => m.ExperiencesPageModule)
          }
        ]
      },
      // {
      //   path: 'new',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
      //     }
      //   ]
      // },
      {
        path: 'board',
        children: [
          {
            path: '',
            loadChildren: () => import('./board/board.module').then( m => m.BoardPageModule)
          }
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/pages/tabs/feed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/pages/tabs/feed',
    pathMatch: 'full'
  },
  {
    path: 'board',
    loadChildren: () => import('./board/board.module').then( m => m.BoardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}

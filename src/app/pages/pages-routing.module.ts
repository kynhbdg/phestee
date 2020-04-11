import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginguardGuard } from '../services/loginguard.guard';


import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: PagesPage,
    canActivate: [LoginguardGuard],
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
      {
        path: 'chats',
        children: [
          {
            path: '',
            loadChildren: () => import('./chats/chats.module').then( m => m.ChatsPageModule)
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
        path: 'board/:boardId',
        loadChildren: () => import('./board/board.module').then( m => m.BoardPageModule)
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
  }
  // {
  //   path: 'chats',
  //   loadChildren: () => import('./chats/chats.module').then( m => m.ChatsPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}

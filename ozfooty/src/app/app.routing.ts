import {Routes} from '@angular/router';
import {HomeCmpComponent} from './home-cmp/home-cmp.component';
import {HeadOnHeadCmpComponent} from './head-on-head-cmp/head-on-head-cmp.component';

export const AppRoutes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeCmpComponent,
  },
  {
    path: 'head-on-head',
    component: HeadOnHeadCmpComponent,
  }
];



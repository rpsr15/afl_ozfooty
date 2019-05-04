import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderCmpComponent } from './header-cmp/header-cmp.component';
import {SidebarCmpComponent} from './sidebar-cmp/sidebar-cmp.component';
import { HomeCmpComponent } from './home-cmp/home-cmp.component';
import {RouterModule} from '@angular/router';
import {AppRoutes} from './app.routing';
import { HeadOnHeadCmpComponent } from './head-on-head-cmp/head-on-head-cmp.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderCmpComponent,
    SidebarCmpComponent,
    HomeCmpComponent,
    HeadOnHeadCmpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

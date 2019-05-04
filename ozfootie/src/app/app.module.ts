import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { NavbarCmpComponent } from './navbar-cmp/navbar-cmp.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { LogoHeaderComponent } from './logo-header/logo-header.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    NavbarCmpComponent,
    LogoHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CollapseModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

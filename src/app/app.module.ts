import { LastfmService } from './services/lastfm.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AlbumComponent } from './album/album.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'album/:mbid/:artist', component: AlbumComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InfiniteScrollModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
      )
  ],
  providers: [
    LastfmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

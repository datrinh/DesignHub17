import { BookmarkService } from './shared/bookmark.service';
import { VideoService } from './video/video.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdIconModule,
  MdProgressBarModule,
  MdSliderModule,
  MdSidenavModule,
  MdDialogModule,
  MdInputModule,
  MdSnackBarModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { TimePipe } from './shared/time-pipe.pipe';
import { ControlsComponent } from './controls/controls.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ActionControlsComponent } from './action-controls/action-controls.component';
import { AddBookmarkComponent } from './shared/dialog/add-bookmark/add-bookmark.component';

// add all need Material modules here
const MaterialModules = [
  MdButtonModule,
  MdIconModule,
  MdProgressBarModule,
  MdSliderModule,
  MdSidenavModule,
  MdDialogModule,
  MdInputModule,
  MdSnackBarModule
];

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    TimePipe,
    ControlsComponent,
    TimelineComponent,
    ActionControlsComponent,
    AddBookmarkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    FlexLayoutModule
  ],
  entryComponents: [
    AddBookmarkComponent
  ],
  providers: [VideoService, BookmarkService],
  bootstrap: [AppComponent]
})
export class AppModule { }

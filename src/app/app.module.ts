import { AudioCommentService } from './shared/audio-comment/audio-comment.service';
import { BookmarkService } from './shared/bookmark/bookmark.service';
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
  MdSnackBarModule,
  MdListModule,
  MdTooltipModule
} from '@angular/material';
import 'hammerjs';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { TimePipe } from './shared/pipes/time-pipe.pipe';
import { ControlsComponent } from './controls/controls.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ActionControlsComponent } from './action-controls/action-controls.component';
import { AddBookmarkComponent } from './shared/dialog/add-bookmark/add-bookmark.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { AddAudioCommentComponent } from './shared/dialog/add-audio-comment/add-audio-comment.component';
import { Drag2windComponent } from './drag2wind/drag2wind.component';

// add all need Material modules here
const MaterialModules = [
  MdTooltipModule,
  MdButtonModule,
  MdIconModule,
  MdProgressBarModule,
  MdSliderModule,
  MdSidenavModule,
  MdDialogModule,
  MdInputModule,
  MdSnackBarModule,
  MdListModule
];

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    TimePipe,
    ControlsComponent,
    TimelineComponent,
    ActionControlsComponent,
    AddBookmarkComponent,
    SidenavComponent,
    AddAudioCommentComponent,
    Drag2windComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ...MaterialModules
  ],
  entryComponents: [
    AddBookmarkComponent,
    AddAudioCommentComponent
  ],
  providers: [VideoService, BookmarkService, AudioCommentService, TimePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ActionService } from './actions/action.service';
import { AudioCommentService } from './shared/audio-comment/audio-comment.service';
import { BookmarkService } from './shared/bookmark/bookmark.service';
import { VideoService } from './video/video.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdIconModule,
  MdProgressBarModule,
  MdSliderModule,
  MdSidenavModule,
  MdDialogModule,
  MdInputModule,
  MdSnackBarModule,
  MdListModule,
  MdTooltipModule,
  MdProgressSpinnerModule
} from '@angular/material';
import 'hammerjs';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { TimePipe } from './shared/pipes/time-pipe.pipe';
import { ControlsComponent } from './controls/controls.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ActionControlsComponent } from './actions/actions-controls/action-controls.component';
import { AddBookmarkComponent } from './shared/dialog/add-bookmark/add-bookmark.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { AddAudioCommentComponent } from './shared/dialog/add-audio-comment/add-audio-comment.component';
import { Drag2windComponent } from './drag2wind/drag2wind.component';
// import { MySidebarComponent } from './layout/my-sidebar/my-sidebar.component';
import { TimelineItemsComponent } from './timeline/timeline-items/timeline-items.component';
import { EditTimelineItemComponent } from './shared/dialog/edit-timeline-item/edit-timeline-item.component';

// add all need Material modules here
const MaterialModules = [
  MdTooltipModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdIconModule,
  MdProgressBarModule,
  MdSliderModule,
  MdSidenavModule,
  MdDialogModule,
  MdInputModule,
  MdSnackBarModule,
  MdListModule,
  MdProgressSpinnerModule
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
    Drag2windComponent,
    SidenavComponent,
    AddAudioCommentComponent,
    // MySidebarComponent,
    TimelineItemsComponent,
    EditTimelineItemComponent
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
    AddAudioCommentComponent,
    EditTimelineItemComponent
  ],
  providers: [VideoService, BookmarkService, AudioCommentService, TimePipe, ActionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

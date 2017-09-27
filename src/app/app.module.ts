import { ShapeService } from './shared/shape/shape.service';
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
  MdProgressSpinnerModule,
  MdGridListModule
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
import { EditBookmarkComponent } from './shared/dialog/edit-bookmark/edit-bookmark.component';
import { EditAudioCommentComponent } from './shared/dialog/edit-audio-comment/edit-audio-comment.component';
import { AddShapeComponent } from './shared/dialog/add-shape/add-shape.component';

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
  MdProgressSpinnerModule,
  MdGridListModule
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
    EditBookmarkComponent,
    EditAudioCommentComponent,
    AddShapeComponent
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
    EditAudioCommentComponent,
    EditBookmarkComponent,
    AddShapeComponent
  ],
  providers: [
    VideoService,
    BookmarkService,
    AudioCommentService,
    TimePipe,
    ActionService,
    ShapeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

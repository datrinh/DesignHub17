import { ShapeService } from './shared/shape/shape.service';
import { ActionService } from './actions/action.service';
import { AudioCommentService } from './shared/audio-comment/audio-comment.service';
import { BookmarkService } from './shared/bookmark/bookmark.service';
import { VideoService } from './video/video.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { AddAnnotationComponent } from './shared/dialog/add-annotation/add-annotation.component';
import { AnnotationService } from './shared/annotation/annotation.service';
import { MinimapComponent } from './minimap/minimap.component';

// add all need Material modules here
const MaterialModules = [
  MatTooltipModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressBarModule,
  MatSliderModule,
  MatSidenavModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatGridListModule
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
    AddShapeComponent,
    AddAnnotationComponent,
    MinimapComponent
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
    AddShapeComponent,
    AddAnnotationComponent
  ],
  providers: [
    VideoService,
    BookmarkService,
    AudioCommentService,
    TimePipe,
    ActionService,
    ShapeService,
    AnnotationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

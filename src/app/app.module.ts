import { VideoService } from './video/video.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdIconModule, MdProgressBarModule, MdSliderModule, MdSidenavModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { TimePipe } from './shared/time-pipe.pipe';
import { ControlsComponent } from './controls/controls.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ActionControlsComponent } from './action-controls/action-controls.component';

// add all need Material modules here
const MaterialModules = [
  MdButtonModule,
  MdIconModule,
  MdProgressBarModule,
  MdSliderModule,
  MdSidenavModule
];

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    TimePipe,
    ControlsComponent,
    TimelineComponent,
    ActionControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    FlexLayoutModule
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

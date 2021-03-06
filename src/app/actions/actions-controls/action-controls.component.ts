import { ShapeService } from '../../shared/shape/shape.service';
import { AddShapeComponent } from '../../shared/dialog/add-shape/add-shape.component';
import { ActionService } from '../action.service';
import { TimePipe } from '../../shared/pipes/time-pipe.pipe';
import { AddAudioCommentComponent } from '../../shared/dialog/add-audio-comment/add-audio-comment.component';
import { AudioCommentService } from '../../shared/audio-comment/audio-comment.service';
import { AddBookmarkComponent } from '../../shared/dialog/add-bookmark/add-bookmark.component';
import { VideoService } from '../../video/video.service';
import { BookmarkService } from '../../shared/bookmark/bookmark.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTooltip } from '@angular/material';
import { AddAnnotationComponent } from '../../shared/dialog/add-annotation/add-annotation.component';
import { AnnotationService } from '../../shared/annotation/annotation.service';

const DEFAULT_TOOLTIP_LABEL = 'Halten zum Aufnehmen';

const enum RECORD_ICON {
  ON = 'fiber_smart_record',
  OFF = 'fiber_manual_record'
}

@Component({
  selector: 'dh-action-controls',
  templateUrl: './action-controls.component.html',
  styleUrls: ['./action-controls.component.scss']
})
export class ActionControlsComponent implements OnInit {
  mode: string;
  recordIcon = RECORD_ICON.OFF;
  tooltipLabel = DEFAULT_TOOLTIP_LABEL;
  @ViewChild('tooltip') tooltip: MatTooltip;
  // isPressing = false;
  pressInterval;
  audioDuration = 0;

  constructor(
    private annotation: AnnotationService,
    private video: VideoService,
    private audio: AudioCommentService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private timePipe: TimePipe,
    // private action: ActionService
  ) { }

  ngOnInit() {
    // this.action.mode$.subscribe(
    //   mode => this.mode = mode
    // );
    this.audio.init();
  }

  // setMode(mode: string) {
  //   this.action.setMode(mode);
  // }

  addAnnotation() {
    const timestamp = this.video.currentTime;
    this.video.pauseVideo();
    const annotationDialog = this.dialog.open(AddAnnotationComponent, {
      data: {
        timestamp: timestamp
      }
    });
    annotationDialog.afterClosed().subscribe(res => {
      if (res) {
        this.audio.saveRecord();
        this.annotation.createAnnotation({
          timestamp: this.video.currentTime,
          shape: res.icon,
          title: res.title,
          audio: res.audio
        });
        console.log(res);
        this.snackbar.open('Annotation wurde gespeichert.', null, {
          duration: 2000
        });
      } else {
        this.audio.reset();
      }
    });
  }
}

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
    private bookmark: BookmarkService,
    private video: VideoService,
    private audio: AudioCommentService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private timePipe: TimePipe,
    private action: ActionService,
    private shape: ShapeService
  ) { }

  ngOnInit() {
    this.action.mode$.subscribe(
      mode => this.mode = mode
    );
    this.audio.init();
  }

  setMode(mode: string) {
    this.action.setMode(mode);
  }

  addBookmark() {
    this.video.player.pause();
    const bookmarkDialog = this.dialog.open(AddBookmarkComponent, {
      data: {
        timestamp: this.video.currentTime
      }
    });
    bookmarkDialog.afterClosed().subscribe(res => {
      if (res) {
        this.bookmark.createBookmark(this.video.currentTime, res.value);
        this.snackbar.open(`${res.value} wurde gespeichert.`, null, {
          duration: 2000
        });
      }
    });
  }

  // startRecording() {
  //   console.log('recording...');
  //   this.showTooltip();
  //   this.video.player.pause();
  //   this.audio.startRecording();
  //   this.recordIcon = RECORD_ICON.ON;
  // }

  // stopRecording() {
  //   console.log('stop recording...');
  //   this.audio.stopRecording();
  //   this.recordIcon = RECORD_ICON.OFF;
  //   this.tooltip.hide();
  //   this.tooltipLabel = '';
  //   window.clearInterval(this.pressInterval);
  // }

  // onPress() {
  //   this.startRecording();
  // }

  // onPressUp(e) {
  //   this.stopRecording();
  //   const audioCommentDialog = this.dialog.open(AddAudioCommentComponent, {
  //     data: {
  //       timestamp: this.video.currentTime
  //     }
  //   });
  //   audioCommentDialog.afterClosed().subscribe(res => {
  //     if (res) {
  //       // already preemptively saved
  //       this.snackbar.open('Kommentar wurde gespeichert.', null, {
  //         duration: 2000
  //       });
  //     } else {
  //       this.audio.deleteLastRecord();
  //     }
  //   });
  // }

  // showTooltip() {
  //   this.audioDuration = 0;
  //   this.tooltip.show();
  //   this.pressInterval = window.setInterval(() => {
  //     this.tooltipLabel = this.timePipe.transform(this.audioDuration, 'mm:ss');
  //     this.audioDuration++;
  //   }, 1000);
  // }

  // onTap() {
  //   this.tooltipLabel = 'Halten zum Aufnehmen';
  // }

  addAudio() {
    this.video.player.pause();
    const audioCommentDialog = this.dialog.open(AddAudioCommentComponent, {
      data: {
        timestamp: this.video.currentTime
      }
    });
    audioCommentDialog.afterClosed().subscribe(res => {
      if (res) {
        this.audio.saveRecord();
        this.snackbar.open('Kommentar wurde gespeichert.', null, {
          duration: 2000
        });
      } else {
        this.audio.reset();
      }
    });
  }

  addShape() {
    const timestamp = this.video.currentTime;
    this.video.player.pause();
    const shapeDialog = this.dialog.open(AddShapeComponent, {
      data: {
        timestamp: timestamp
      }
    });
    shapeDialog.afterClosed().subscribe(res => {
      if (res) {
        console.log(res);
        this.shape.createShape(timestamp, res.icon, res.title);
        this.snackbar.open('Muster wurde gespeichert.', null, {
          duration: 2000
        });
      }
    });
  }

  addAnnotation() {
    const timestamp = this.video.currentTime;
    this.video.player.pause();
    const annotationDialog = this.dialog.open(AddAnnotationComponent, {
      data: {
        timestamp: timestamp
      }
    });
    annotationDialog.afterClosed().subscribe(res => {
      if (res) {
        this.audio.saveRecord();
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

import { ActionService } from '../action.service';
import { TimePipe } from '../../shared/pipes/time-pipe.pipe';
import { AddAudioCommentComponent } from '../../shared/dialog/add-audio-comment/add-audio-comment.component';
import { AudioCommentService } from '../../shared/audio-comment/audio-comment.service';
import { AddBookmarkComponent } from '../../shared/dialog/add-bookmark/add-bookmark.component';
import { VideoService } from '../../video/video.service';
import { BookmarkService } from '../../shared/bookmark/bookmark.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdSnackBar, MdTooltip } from '@angular/material';

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
  @ViewChild('tooltip') tooltip: MdTooltip;
  // isPressing = false;
  pressInterval;
  audioDuration = 0;

  constructor(
    private bookmark: BookmarkService,
    private video: VideoService,
    private audio: AudioCommentService,
    private dialog: MdDialog,
    private snackbar: MdSnackBar,
    private timePipe: TimePipe,
    private action: ActionService
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

  startRecording() {
    console.log('recording...');
    this.showTooltip();
    this.video.player.pause();
    this.audio.startRecording();
    this.recordIcon = RECORD_ICON.ON;
  }

  stopRecording() {
    console.log('stop recording...');
    this.audio.stopRecording();
    this.recordIcon = RECORD_ICON.OFF;
    this.tooltip.hide();
    this.tooltipLabel = '';
    window.clearInterval(this.pressInterval);
  }

  onPress() {
    this.startRecording();
  }

  onPressUp(e) {
    this.stopRecording();
    const audioCommentDialog = this.dialog.open(AddAudioCommentComponent, {
      data: {
        timestamp: this.video.currentTime
      }
    });
    audioCommentDialog.afterClosed().subscribe(res => {
      if (res) {
        // already preemptively saved
        this.snackbar.open('Kommentar wurde gespeichert.', null, {
          duration: 2000
        });
      } else {
        this.audio.deleteLastRecord();
      }
    });
  }

  showTooltip() {
    this.audioDuration = 0;
    this.tooltip.show();
    this.pressInterval = window.setInterval(() => {
      this.tooltipLabel = this.timePipe.transform(this.audioDuration, 'mm:ss');
      this.audioDuration++;
    }, 1000);
  }

  onTap() {
    this.tooltipLabel = 'Halten zum Aufnehmen';
  }
}
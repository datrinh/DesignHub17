import { TimePipe } from '../shared/pipes/time-pipe.pipe';
import { AddAudioCommentComponent } from '../shared/dialog/add-audio-comment/add-audio-comment.component';
import { AudioCommentService } from '../shared/audio-comment/audio-comment.service';
import { AddBookmarkComponent } from '../shared/dialog/add-bookmark/add-bookmark.component';
import { VideoService } from '../video/video.service';
import { BookmarkService } from '../shared/bookmark/bookmark.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdSnackBar, MdTooltip } from '@angular/material';

export enum ActionMode {
  bookmark = 'bookmark',
  audio = 'audio',
  vibration = 'vibration'
}

@Component({
  selector: 'dh-action-controls',
  templateUrl: './action-controls.component.html',
  styleUrls: ['./action-controls.component.scss']
})
export class ActionControlsComponent implements OnInit {
  mode: string = ActionMode.bookmark;
  recordIcon = 'fiber_manual_record';
  tooltipLabel = '';
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
    private timePipe: TimePipe
  ) { }

  ngOnInit() {
    this.audio.init();
    // this.tooltip.hide();
  }

  setMode(mode: string) {
    this.mode = mode;
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
    this.audio.startRecording();
  }

  stopRecording() {
    this.audio.stopRecording();
  }

  onPress(e) {
    console.log('recording...:', e);
    this.video.player.pause();
    this.startRecording();
    this.recordIcon = 'fiber_smart_record';
    this.showTooltip();
  }

  onPressUp(e) {
    console.log('stop recording...');
    this.stopRecording();
    // change action button
    this.recordIcon = 'fiber_manual_record';

    // this.hideTooltip();
    // show dialog
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
    console.log('showing Tooltip');
    this.audioDuration = 0;
    // this.isPressing = true;
    this.tooltip.show();
    this.pressInterval = window.setInterval(() => {
      // if (this.isPressing) {
        this.tooltipLabel = this.timePipe.transform(this.audioDuration, 'mm:ss');
        this.audioDuration = this.audioDuration + 1;
      // }
      console.log(this.audioDuration);
    }, 1000);
  }

  hideTooltip() {
    console.log('Hiding Tooltip');
    this.tooltip.hide();
    // this.isPressing = false;
    window.clearInterval(this.pressInterval);
    // this.tooltipLabel = '';
  }

  onTap() {
    this.tooltipLabel = 'Halten zum Aufnehmen';
  }
}

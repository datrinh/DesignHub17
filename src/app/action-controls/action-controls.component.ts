import { AddAudioCommentComponent } from '../shared/dialog/add-audio-comment/add-audio-comment.component';
import { AudioCommentService } from '../shared/audio-comment/audio-comment.service';
import { AddBookmarkComponent } from '../shared/dialog/add-bookmark/add-bookmark.component';
import { VideoService } from '../video/video.service';
import { BookmarkService } from '../shared/bookmark/bookmark.service';
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';

@Component({
  selector: 'dh-action-controls',
  templateUrl: './action-controls.component.html',
  styleUrls: ['./action-controls.component.scss']
})
export class ActionControlsComponent implements OnInit {

  mode = 'bookmark';

  constructor(
    private bookmark: BookmarkService,
    private video: VideoService,
    private audio: AudioCommentService,
    private dialog: MdDialog,
    private snackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this.audio.init();
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
    this.startRecording();
    console.log('recording...:', e);
  }

  onPressUp(e) {
    console.log('stop recording...');
    this.stopRecording();
    const audioCommentDialog = this.dialog.open(AddAudioCommentComponent, {
      data: {
        timestamp: this.video.currentTime
      }
    });
    audioCommentDialog.afterClosed().subscribe(res => {
      if (res) {
        // already preemptively saved
        this.snackbar.open(`Kommentar wurde gespeichert.`, null, {
          duration: 2000
        });
      } else {
        this.audio.deleteLastRecord();
      }
    });
  }
}

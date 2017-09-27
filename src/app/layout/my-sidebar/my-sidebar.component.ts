import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { AudioCommentService } from '../../shared/audio-comment/audio-comment.service';
import { VideoService } from '../../video/video.service';
import { BookmarkService } from '../../shared/bookmark/bookmark.service';

@Component({
  selector: 'dh-my-sidebar',
  templateUrl: './my-sidebar.component.html',
  styleUrls: ['./my-sidebar.component.scss']
})
export class MySidebarComponent implements OnInit {
  isBookmarksVisible = false;
  isCommentsVisible = false;
  isVibrationsVisible = false;
  isSettingsVisible = false;

  constructor(
    public bookmarks: BookmarkService,
    private video: VideoService,
    public audio: AudioCommentService,
    private snackbar: MdSnackBar
  ) { }

  ngOnInit() {
  }

  jumpToTimestamp(timestamp: number) {
    this.video.player.currentTime = timestamp;
    this.video.player.pause();
  }

  deleteBookmark(id: number) {
    this.bookmarks.deleteBookmark(id);
    this.snackbar.open('Lesezeichen wurde gelöscht.', null, { duration: 2000 });
  }

  deleteRecord(id: number) {
    this.audio.deleteRecord(id);
    this.snackbar.open('Kommentar wurde gelöscht.', null, { duration: 2000 });
  }

  sidebarOnChange(value: any) {
    switch (value) {
      case 'bookmark':
        this.isCommentsVisible = false;
        this.isVibrationsVisible = false;
        this.isSettingsVisible = false;
        this.isBookmarksVisible = !this.isBookmarksVisible;
        break;
      case 'comment':
        this.isBookmarksVisible = false;
        this.isVibrationsVisible = false;
        this.isSettingsVisible = false;
        this.isCommentsVisible = !this.isCommentsVisible;
        break;
      case 'vibration':
        this.isBookmarksVisible = false;
        this.isCommentsVisible = false;
        this.isSettingsVisible = false;
        this.isVibrationsVisible = !this.isVibrationsVisible;
        break;
      case 'settings':
        this.isBookmarksVisible = false;
        this.isCommentsVisible = false;
        this.isVibrationsVisible = false;
        this.isSettingsVisible = !this.isSettingsVisible;
        break;
      default:
        this.isBookmarksVisible = false;
        this.isCommentsVisible = false;
        this.isVibrationsVisible = false;
        this.isSettingsVisible = false;
        break;
    }
  }
}

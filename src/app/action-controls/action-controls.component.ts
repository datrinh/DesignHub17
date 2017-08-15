import { AddBookmarkComponent } from '../shared/dialog/add-bookmark/add-bookmark.component';
import { VideoService } from '../video/video.service';
import { BookmarkService } from '../shared/bookmark.service';
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';

@Component({
  selector: 'dh-action-controls',
  templateUrl: './action-controls.component.html',
  styleUrls: ['./action-controls.component.scss']
})
export class ActionControlsComponent implements OnInit {

  constructor(
    private bookmark: BookmarkService,
    private video: VideoService,
    private dialog: MdDialog,
    private snackbar: MdSnackBar
  ) { }

  ngOnInit() {
  }

  addBookmark() {
    this.video.player.pause();
    const dialogRef = this.dialog.open(AddBookmarkComponent, {
      data: {
        timestamp: this.video.currentTime
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.bookmark.createBookmark(this.video.currentTime, res.value);
        this.snackbar.open(`${res.value} wurde gespeichert.`, null, {
          duration: 2000
        });
      }
    });
  }

}

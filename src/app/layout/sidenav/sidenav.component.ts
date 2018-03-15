import { ShapeService } from '../../shared/shape/shape.service';
import { AudioCommentService } from '../../shared/audio-comment/audio-comment.service';
import { VideoService } from '../../video/video.service';
import { BookmarkService } from '../../shared/bookmark/bookmark.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AnnotationService } from '../../shared/annotation/annotation.service';

@Component({
  selector: 'dh-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    public bookmarks: BookmarkService,
    private video: VideoService,
    public audio: AudioCommentService,
    public shape: ShapeService,
    private annotation: AnnotationService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  jumpToTimestamp(timestamp: number) {
    this.video.player.currentTime = timestamp;
    this.video.pauseVideo();
  }

  deleteBookmark(id: number) {
    this.bookmarks.deleteBookmark(id);
    this.snackbar.open('Lesezeichen wurde gelöscht.', null, { duration: 2000 });
  }

  deleteRecord(id: number) {
    this.audio.deleteRecord(id);
    this.snackbar.open('Kommentar wurde gelöscht.', null, { duration: 2000 });
  }

}

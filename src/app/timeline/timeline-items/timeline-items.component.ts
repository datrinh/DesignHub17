import { Shape, ShapeService } from '../../shared/shape/shape.service';
import { EditAudioCommentComponent } from '../../shared/dialog/edit-audio-comment/edit-audio-comment.component';
import { EditBookmarkComponent } from '../../shared/dialog/edit-bookmark/edit-bookmark.component';
import { VideoService } from '../../video/video.service';
import { Observable } from 'rxjs/Rx';
import { AudioComment, AudioCommentService } from '../../shared/audio-comment/audio-comment.service';
import { Bookmark, BookmarkService } from '../../shared/bookmark/bookmark.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AnnotationService, Annotation } from '../../shared/annotation/annotation.service';
import { AddAnnotationComponent } from '../../shared/dialog/add-annotation/add-annotation.component';

export interface TimelineItem {
  annotation: Annotation;
  position: number;
}

@Component({
  selector: 'dh-timeline-items',
  templateUrl: './timeline-items.component.html',
  styleUrls: ['./timeline-items.component.scss']
})
export class TimelineItemsComponent implements OnInit {
  offset = 0.95;

  items$: Observable<TimelineItem[]>;

  constructor(
    private annotation: AnnotationService,
    public bookmark: BookmarkService,
    public audio: AudioCommentService,
    private shape: ShapeService,
    private video: VideoService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    // this.items$ = Observable.combineLatest(
    //   this.bookmark.bookmarks$,
    //   this.audio.audioComments$,
    //   this.shape.shapes$
    // ).map(([bookmarks, audio, shape]) => [...bookmarks, ...audio, ...shape].map(item => {
    //     const position = this.video.calcProgress(item.timestamp, this.video.duration);
    //     // TODO: more types
    //     const icon = this.getIcon(item.type);
    //     return {
    //       item: item,
    //       position: position,
    //       icon: icon
    //     };
    //   }))
    //   .do((res) => console.log(res));
    this.items$ = this.annotation.annotations$.map(annotation => annotation.map(item => {
      const position = this.getPosition(item.timestamp);
      return {
        annotation: item,
        position: position
      };
    }));
  }

  getPosition(timestamp: number): number {
    return this.video.calcProgress(timestamp, this.video.duration);
  }

  onClick(item: TimelineItem) {
    this.video.pauseVideo();

    const editDialog = this.dialog.open(AddAnnotationComponent, {
      data: {
        item: item
      }
    });

      // TODO
    // editDialog.afterClosed().subscribe((res) => {
    //   if (item.item.type === 'bookmark' && res) {
    //     this.bookmark.editBookmark(item.item.id, res);

    //     this.snackbar.open('Lesezeichen ' + res + ' geändert', null, {
    //       duration: 2000
    //     });
    //   }
    // });
  }
}

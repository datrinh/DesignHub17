import { Shape, ShapeService } from '../../shared/shape/shape.service';
import { EditAudioCommentComponent } from '../../shared/dialog/edit-audio-comment/edit-audio-comment.component';
import { EditBookmarkComponent } from '../../shared/dialog/edit-bookmark/edit-bookmark.component';
import { VideoService } from '../../video/video.service';
import { Observable } from 'rxjs/Rx';
import { AudioComment, AudioCommentService } from '../../shared/audio-comment/audio-comment.service';
import { Bookmark, BookmarkService } from '../../shared/bookmark/bookmark.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

export interface TimelineItem {
  item: Bookmark | AudioComment | Shape;
  position: number;
  icon: string;
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
    public bookmark: BookmarkService,
    public audio: AudioCommentService,
    private shape: ShapeService,
    private video: VideoService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.items$ = Observable.combineLatest(
      this.bookmark.bookmarks$,
      this.audio.audioComments$,
      this.shape.shapes$
    ).map(([bookmarks, audio, shape]) => [...bookmarks, ...audio, ...shape].map(item => {
        const position = this.video.calcProgress(item.timestamp, this.video.duration);
        // TODO: more types
        const icon = this.getIcon(item.type);
        return {
          item: item,
          position: position,
          icon: icon
        };
      }))
      .do((res) => console.log(res));
  }

  getPosition(timestamp: number): number {
    return this.video.calcProgress(timestamp, this.video.duration);
  }

  onClick(item: TimelineItem) {
    this.video.player.pause();
    let component;
    switch (item.item.type) {
      case 'bookmark':
        component = EditBookmarkComponent;
        break;
      case 'audio':
        component = EditAudioCommentComponent;
        break;
      case 'shape':
        return;
      default:
        return;
    }

    const editDialog = this.dialog.open(component, {
      data: {
        item: item.item
      }
    });

    editDialog.afterClosed().subscribe((res) => {
      if (item.item.type === 'bookmark' && res) {
        this.bookmark.editBookmark(item.item.id, res);

        this.snackbar.open('Lesezeichen ' + res + ' geändert', null, {
          duration: 2000
        });
      }
    });
  }

  private getIcon(type) {
    let icon;
    switch (type) {
      case 'bookmark':
        icon = 'bookmark_border';
        break;
      case 'audio':
        icon = 'mic';
        break;
      case 'shape':
        icon = 'hdr_weak';
        break;
      default:
        break;
    }
    return icon;
  }
}

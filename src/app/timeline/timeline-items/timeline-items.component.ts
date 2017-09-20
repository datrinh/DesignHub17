import { VideoService } from '../../video/video.service';
import { Observable } from 'rxjs/Rx';
import { AudioComment, AudioCommentService } from '../../shared/audio-comment/audio-comment.service';
import { Bookmark, BookmarkService } from '../../shared/bookmark/bookmark.service';
import { Component, OnInit } from '@angular/core';

interface TimelineItem {
  timestamp: number;
  position: number;
  icon: string;
}

@Component({
  selector: 'dh-timeline-items',
  templateUrl: './timeline-items.component.html',
  styleUrls: ['./timeline-items.component.scss']
})
export class TimelineItemsComponent implements OnInit {
  offset = 0.955;

  items$: Observable<TimelineItem[]>;

  constructor(
    public bookmark: BookmarkService,
    public audio: AudioCommentService,
    private video: VideoService
  ) { }

  ngOnInit() {
    this.items$ = Observable.combineLatest(
      this.bookmark.bookmarks$,
      this.audio.audioComments$
    ).map(([bookmarks, audio]) => [...bookmarks, ...audio].map(item => {
        const position = this.video.calcProgress(item.timestamp, this.video.duration);
        // TODO: more types
        const icon = item.type === 'bookmark' ? 'bookmark' : 'mic';
        return {
          timestamp: item.timestamp,
          position: position,
          icon: icon
        };
      }))
      .do((res) => console.log(res));
  }

  getPosition(timestamp: number): number {
    return this.video.calcProgress(timestamp, this.video.duration);
  }
}

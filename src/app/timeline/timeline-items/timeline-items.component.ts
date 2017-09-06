import { Observable } from 'rxjs/Rx';
import { AudioComment, AudioCommentService } from '../../shared/audio-comment/audio-comment.service';
import { Bookmark, BookmarkService } from '../../shared/bookmark/bookmark.service';
import { Component, OnInit } from '@angular/core';

interface TimelineItem {
  timestamp: number;
}

@Component({
  selector: 'dh-timeline-items',
  templateUrl: './timeline-items.component.html',
  styleUrls: ['./timeline-items.component.scss']
})
export class TimelineItemsComponent implements OnInit {

  items$: Observable<TimelineItem[]>;

  constructor(
    public bookmark: BookmarkService,
    public audio: AudioCommentService
  ) { }

  ngOnInit() {
    this.items$ = Observable.merge(
      this.bookmark.bookmarks$,
      this.audio.audioComments$
    ).map((items: any) => items.map(item => {
      console.log(item);
      return {
        timestamp: item.timestamp
      };
    }));
  }
}

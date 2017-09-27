import { TimelineItem } from '../../../timeline/timeline-items/timeline-items.component';
import { AudioComment, AudioCommentService } from '../../audio-comment/audio-comment.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { Bookmark, BookmarkService } from '../../bookmark/bookmark.service';

@Component({
  selector: 'dh-edit-timeline-item',
  templateUrl: './edit-timeline-item.component.html',
  styleUrls: ['./edit-timeline-item.component.scss']
})
export class EditTimelineItemComponent implements OnInit {
  item;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    private bookmark: BookmarkService,
    private audio: AudioCommentService
  ) { }

  ngOnInit() {
    this.item = this.data.item;
  }

  onDelete(item) {
    if (item.type === 'bookmark') {
      this.bookmark.deleteBookmark(item.id);
    } else if (item.type === 'audio') {
      this.audio.deleteRecord(item.id);
    }
  }
}

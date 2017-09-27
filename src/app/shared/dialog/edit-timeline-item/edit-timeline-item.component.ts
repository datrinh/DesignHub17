import { TimelineItem } from '../../../timeline/timeline-items/timeline-items.component';
import { AudioComment } from '../../audio-comment/audio-comment.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { Bookmark } from '../../bookmark/bookmark.service';

@Component({
  selector: 'dh-edit-timeline-item',
  templateUrl: './edit-timeline-item.component.html',
  styleUrls: ['./edit-timeline-item.component.scss']
})
export class EditTimelineItemComponent implements OnInit {

  item;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.item = this.data.item;
  }

}

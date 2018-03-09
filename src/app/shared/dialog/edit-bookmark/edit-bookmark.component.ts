import { BookmarkService } from '../../bookmark/bookmark.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dh-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {
  item;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookmark: BookmarkService,
  ) { }

  ngOnInit() {
    this.item = this.data.item;
  }

  onDelete(item) {
    this.bookmark.deleteBookmark(item.id);
  }
}

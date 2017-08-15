import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dh-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {

  timestamp: number;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.timestamp = this.data.timestamp;
  }

}

import { AudioCommentService } from '../../audio-comment/audio-comment.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dh-edit-audio-comment',
  templateUrl: './edit-audio-comment.component.html',
  styleUrls: ['./edit-audio-comment.component.scss']
})
export class EditAudioCommentComponent implements OnInit {
  item;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    private audio: AudioCommentService
  ) { }

  ngOnInit() {
    this.item = this.data.item;
  }

  onDelete(item) {
    this.audio.deleteRecord(item.id);
  }
}

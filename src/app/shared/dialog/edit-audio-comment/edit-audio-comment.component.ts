import { AudioComment, AudioCommentService } from '../../audio-comment/audio-comment.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dh-edit-audio-comment',
  templateUrl: './edit-audio-comment.component.html',
  styleUrls: ['./edit-audio-comment.component.scss']
})
export class EditAudioCommentComponent implements OnInit {
  item;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private audio: AudioCommentService
  ) { }

  ngOnInit() {
    this.item = this.data.item;
  }

  onDelete(item: AudioComment) {
    this.audio.deleteRecord(item.id);
  }

  play(item: AudioComment) {
    this.audio.playRecord(item.audio.src);
  }
}

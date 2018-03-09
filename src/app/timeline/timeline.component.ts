import { VideoService } from '../video/video.service';
import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'dh-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  constructor(public videoService: VideoService) { }

  ngOnInit() {
  }

  setCurrentTime(e: MatSliderChange) {
    this.videoService.player.currentTime = e.value;
  }
}

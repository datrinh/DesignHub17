import { VideoService } from '../video/video.service';
import { Component, OnInit } from '@angular/core';
import { MdSliderChange } from '@angular/material';

@Component({
  selector: 'dh-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  constructor(private videoService: VideoService) { }

  ngOnInit() {
  }

  setCurrentTime(e: MdSliderChange) {
    this.videoService.player.currentTime = e.value;
  }
}

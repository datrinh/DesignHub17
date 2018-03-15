import { Component, OnInit, ViewChild } from '@angular/core';
import { VideoService } from '../video/video.service';

@Component({
  selector: 'dh-minimap',
  templateUrl: './minimap.component.html',
  styleUrls: ['./minimap.component.scss']
})
export class MinimapComponent implements OnInit {
  minimapSrc = 'https://media.w3.org/2010/05/bunny/movie.mp4';

  @ViewChild('minimap') minimap;

  constructor(public videoService: VideoService) { }

  ngOnInit() {
    this.videoService.minimap = this.minimap.nativeElement;
  }
}

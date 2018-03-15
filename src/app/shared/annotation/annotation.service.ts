import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { VideoService } from '../../video/video.service';
import { Injectable } from '@angular/core';
import { AudioComment } from '../audio-comment/audio-comment.service';

interface Annotation {
  audio?: AudioComment;
  title?: string;
  shape?: string;
}

@Injectable()
export class AnnotationService {

  annotationStore = [];

  private annotations: BehaviorSubject<Annotation[]> = new BehaviorSubject<Annotation[]>(this.annotationStore);
  annotations$: Observable<Annotation[]> = this.annotations.asObservable();

  constructor(
    private video: VideoService
  ) { }



}

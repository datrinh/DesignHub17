import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { VideoService } from '../../video/video.service';
import { Injectable } from '@angular/core';
import { AudioComment } from '../audio-comment/audio-comment.service';
import { SocketService, Action } from '../socket/socket.service';

export interface Annotation {
  id: number;
  audio?: AudioComment;
  title?: string;
  shape?: string;
  timestamp: number;
  icon: string;
}

@Injectable()
export class AnnotationService {

  annotationStore: Annotation[] = [];

  private annotations: BehaviorSubject<Annotation[]> = new BehaviorSubject<Annotation[]>(this.annotationStore);
  annotations$: Observable<Annotation[]> = this.annotations.asObservable();

  constructor(
    private video: VideoService,
    private socket: SocketService
  ) { }

  createAnnotation(annotation) {
    let icon;
    if (annotation.shape) {
      icon = annotation.shape;
    } else {
      icon = 'add'; // needs work
    }
    this.annotationStore.push({
      id: this.annotationStore.length,
      timestamp: annotation.timestamp,
      title: annotation.title,
      icon: icon,
      audio: annotation.audio
    });
    this.annotations.next(this.annotationStore);
    this.socket.send({action: Action.UPDATE_ANNOTATION, payload: this.annotationStore});
    console.log(this.annotationStore);
  }

  deleteAnnotation(id: number) {
    this.annotationStore = this.annotationStore.filter((item) => id !== item.id);
    this.annotations.next(this.annotationStore);
    this.socket.send({action: Action.UPDATE_ANNOTATION, payload: this.annotationStore});
  }

}

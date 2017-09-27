import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { AudioComment } from '../audio-comment/audio-comment.service';
import { Injectable } from '@angular/core';

export interface Shape {
  id: number;
  icon: string;
  timestamp: number;
  type: string;
  title: string;
}

export const SHAPE_LIST = [
  { icon: 'star_rate', label: 'Stern' },
  { icon: 'favorite', label: 'Herz' },
  { icon: 'arrow_back', label: 'links' },
  { icon: 'arrow_upward', label: 'hoch' },
  { icon: 'arrow_forward', label: 'rechts' },
  { icon: 'arrow_downward', label: 'runter' },
];

@Injectable()
export class ShapeService {
  shapeStore: Shape[] = [];
  private shapes: BehaviorSubject<Shape[]> = new BehaviorSubject<Shape[]>(this.shapeStore);
  shapes$: Observable<Shape[]> = this.shapes.asObservable();

  constructor() { }

  createShape(timestamp: number, icon: string, title: string) {
    this.shapeStore.push({
      id: this.shapeStore.length,
      timestamp: timestamp,
      icon: icon,
      type: 'shape',
      title: title
    });
    this.shapes.next(this.shapeStore);
  }

  deleteShape(id: number) {
    this.shapeStore = this.shapeStore.filter((item) => id !== item.id);
    this.shapes.next(this.shapeStore);
  }

}

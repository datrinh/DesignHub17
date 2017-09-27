import { ShapeService, SHAPE_LIST } from '../../shape/shape.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'dh-add-shape',
  templateUrl: './add-shape.component.html',
  styleUrls: ['./add-shape.component.scss']
})
export class AddShapeComponent implements OnInit {
  shapes = SHAPE_LIST;
  timestamp;
  selectedShape;

  constructor(
    private shape: ShapeService,
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<AddShapeComponent>
  ) { }

  ngOnInit() {
    this.timestamp = this.data.timestamp;
  }

  select(shape) {
    this.selectedShape = shape;
  }

  onSubmit(title: string, shape) {
    this.dialogRef.close({
      title: title,
      icon: shape.icon
    });
  }
}

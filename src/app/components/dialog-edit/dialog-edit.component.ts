import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Userts } from 'src/app/models/userts';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css'],
})
export class DialogEditComponent {
  user: Userts = {
    id: 0,
    title: '',
    state: '',
    url: '',
    created_at: '',
    updated_at: '',
  };
  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Userts,
  ) {};
  ngOnInit(): void {
    if (this.data.url != '') {
      this.user = this.data;
      console.log('Edit Mode');
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

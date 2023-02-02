import { Component, ViewChild } from '@angular/core';
import { AllUserService } from '../../services/all-user.service';
import { Userts } from '../../models/userts';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css'],
})
export class VistaComponent {
  displayedColumns: string[] = [
    'Id',
    'Title',
    'State',
    'Url',
    'Created',
    'Update',
    'Options',
  ];
  dataSource: any;
  users: Userts[] = [];
  // Pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: AllUserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.http.getVista().subscribe({
      next: (user: Userts[]) => {
        this.users = user;
        // guardando en el dataSource mi respuesta
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        // console.log(this.dataSource);
      },
      complete: () => {
        this.dibujarTabla();
      },
    });
  }

  dibujarTabla() {
    this.dataSource = new MatTableDataSource<Userts>(this.users);

    // this.dataSource = new MatTableDataSource<Userts>(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  getrow(row: any) {
    // console.log(row);
  }
  FunctionEdit(element: Userts) {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      data: element,
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      const idActualizar = result.id;
      const index = this.users.findIndex((item) => item.id === idActualizar);
      this.users[index] = result;
    });
  }

  refresh() {
    this.http.getVista().subscribe({
      next: (user: Userts[]) => {
        this.users = user;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.dibujarTabla();
      },
    });
  }

  FunctionDelete(id: any) {
    console.log(id);
    this.users = this.users.filter((item) => item.id !== id);
    this.dibujarTabla();
  }
}

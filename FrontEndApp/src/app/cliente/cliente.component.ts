import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Response } from '../models/response';
import { DialogClienteComponent } from '../dialog/dialogcliente.component';
import {DialogDeleteComponent} from '../common/delete/dialogDelete.component'
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from '../models/cliente';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public lst: any;
  public columnas: string[] = ['id', 'nombre', 'actions'];
  readonly width: string = '300px'
  constructor(
    private apiCliente: ApiService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { 
    
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.apiCliente.getClientes().subscribe(Response => {
      this.lst = Response.data
    });
  }

  openAdd() {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    })
  }

   openEdit(cliente: Cliente) {
     const dialogRef = this.dialog.open(DialogClienteComponent, {
      data: cliente,
      width: this.width,
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    })
   }
  
    openDelete(cliente: Cliente) {
     const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.width,
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiCliente.delete(cliente.id).subscribe(response => {
          if (response.exito === 1) {
            this.snackbar.open("Cliente eliminado con exito", "", {
              duration: 2000
            });
            this.getClientes();
          }
        })
      }
    })
  }
}

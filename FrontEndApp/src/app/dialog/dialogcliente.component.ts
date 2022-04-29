import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../models/cliente';
import { ApiService } from '../services/api.service';

@Component({
    templateUrl: 'dialogcliente.component.html'
})
export class DialogClienteComponent {
    public nombre: string;

    constructor(
        public dialogRef: MatDialogRef<DialogClienteComponent>,
        public api: ApiService,
        public snackBar: MatSnackBar,
        @Inject( MAT_DIALOG_DATA) public cliente: Cliente
    ) {
        if (this.cliente !== null) {
            this.nombre = cliente.nombre;
        }
     }
    
    cerrarDialog() {
        this.dialogRef.close();
    }

    editCliente() {
        const cliente: Cliente = { nombre: this.nombre, id: this.cliente.id };
        this.api.edit(cliente).subscribe(Response => {
             if (Response.exito === 1) {
                 this.dialogRef.close();
                 this.snackBar.open('Cliente editado con éxito', '',{
                     duration: 2000
                 });
             }
         });
    }

     addCliente() {
         const cliente: Cliente = { nombre: this.nombre, id: 0 };
         this.api.add(cliente).subscribe(Response => {
             if (Response.exito === 1) {
                 this.dialogRef.close();
                 this.snackBar.open('Cliente insertado con éxito', '',{
                     duration: 2000
                 });
             }
         });
    }
}

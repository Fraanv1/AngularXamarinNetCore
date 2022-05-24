import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Concepto } from 'src/app/models/concepto';
import { Venta } from 'src/app/models/venta';
import { ApiventaService } from 'src/app/services/apiventa.service';

@Component({
    templateUrl: 'dialogventa.component.html'
})
    
export class DialogVentaComponent{
    public venta: Venta
    public conceptos: Concepto[];
    public conceptoFrom = this.fromBuilder.group({
    cantidad: [0, Validators.required],
    importe: [0, Validators.required],
    idProducto: [1, Validators.required],
    });

    constructor(
        public dialogRef: MatDialogRef<DialogVentaComponent>,
        public snackBar: MatSnackBar,
        private fromBuilder: FormBuilder,
        public apiVenta: ApiventaService,
    ) { 
        this.conceptos = [];
        this.venta = {idCliente: 4, conceptos: []}
    }

    close() {
        this.dialogRef.close();
    }

    addConcepto() {
        this.conceptos.push(this.conceptoFrom.value)
    }

    addVenta() {
        this.venta.conceptos = this.conceptos
        this.apiVenta.add(this.venta).subscribe(data => {
            if (<any>data.exito == 1) {
                this.dialogRef.close();
                this.snackBar.open('Venta hecha con éxito', '', {
                    duration: 2000
                })
            }
        })
    }
}
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
@Injectable()
export class DueñosService {
  private rutaBaseDatos = 'src/base de datos/bd.json';

  private leerBaseDatos() {
    const datos = fs.readFileSync(this.rutaBaseDatos, 'utf-8');
    return JSON.parse(datos);
  }

  private guardarBaseDatos(datos: any[]) {
    fs.writeFileSync(this.rutaBaseDatos, JSON.stringify(datos, null, 2));
  }

  getDueños() {
    const datos = this.leerBaseDatos();
    return datos.dueños;
  }
  
  getDueñosById(id: string) {
    const datos = this.leerBaseDatos();
    for (let i = 0; i < datos.dueños.length; i++) {
      if (datos.dueños[i].id === id) {
        return datos.dueños[i];
      }
    }
    return `Dueño con id ${id} no encontrado`;
  }
  
  registrarDueño(nombre: string, telefono:string, email: string, idDueño: string) {
    const datos = this.leerBaseDatos();
    
    const indiceNuevo = datos.dueños.length + 1;
    const nuevoDueño = {
      id: indiceNuevo,
      nombre,
      telefono,
      email,
      idDueño
    };
  datos.dueños.push(nuevoDueño);
  
  this.guardarBaseDatos(datos);
  return nuevoDueño;
}
}
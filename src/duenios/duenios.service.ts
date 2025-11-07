import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
@Injectable()
export class DueniosService {
  private rutaBaseDatos = 'src/base de datos/bd.json';

  private leerBaseDatos() {
    const datos = fs.readFileSync(this.rutaBaseDatos, 'utf-8');
    return JSON.parse(datos);
  }

  private guardarBaseDatos(datos: any) {
    fs.writeFileSync(this.rutaBaseDatos, JSON.stringify(datos, null, 2));
  }

  getDuenios() {
    const datos = this.leerBaseDatos();
    return datos.duenios;
  }

  getDueniosById(id: string) {
    const datos = this.leerBaseDatos();
    for (let i = 0; i < datos.duenios.length; i++) {
      if (datos.duenios[i].id === id) {
        return datos.duenios[i];
      }
    }
    return `Duenio con id ${id} no encontrado`;
  }

  registrarDuenio(nombre: string, telefono: string, email: string) {
    const datos = this.leerBaseDatos();

    const indiceNuevo = datos.duenios.length + 1;
    const nuevoDuenio = {
      id: String(indiceNuevo),
      nombre,
      telefono,
      email,
    };
    datos.duenios.push(nuevoDuenio);

    this.guardarBaseDatos(datos);
    return nuevoDuenio;
  }
}

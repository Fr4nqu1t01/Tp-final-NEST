import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
@Injectable()
export class MascotasService {
  private rutaBaseDatos = 'src/base de datos/bd.json';

  private leerBaseDatos() {
    const datos = fs.readFileSync(this.rutaBaseDatos, 'utf-8');
    return JSON.parse(datos);
  }
  private guardarBaseDatos(datos: any[]) {
    fs.writeFileSync(this.rutaBaseDatos, JSON.stringify(datos, null, 2));
  }

  getMascotas() {
    return this.leerBaseDatos().mascotas;
  }

  getMascotaById(id: string) {
    for (let i = 0; i < this.leerBaseDatos().mascotas.length; i++) {
      if (this.leerBaseDatos().mascotas[i].id === id) {
        return this.leerBaseDatos().mascotas[i];
      }
    }
    return `Mascota con id ${id} no encontrada`;
  }
  registrarMascota(
    nombre: string,
    raza: string,
    edad: string,
    idDueño: string,
  ) {
    const datos = this.leerBaseDatos();

    const indiceNuevo = datos.mascotas.length + 1;
    const nuevaMascota = {
      id: indiceNuevo.toString(),
      nombre,
      raza,
      edad,
      idDueño,
    };
    datos.mascotas.push(nuevaMascota);

    this.guardarBaseDatos(datos);
    return nuevaMascota;
  }
}

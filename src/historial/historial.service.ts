import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class HistorialService {
  private rutaBaseDatos = 'src/base de datos/bd.json';

  private leerBaseDatos() {
    const datos = fs.readFileSync(this.rutaBaseDatos, 'utf-8');
    return JSON.parse(datos);
  }

  private guardarBaseDatos(datos: any) {
    fs.writeFileSync(this.rutaBaseDatos, JSON.stringify(datos, null, 2));
  }

  getHistorial() {
    const datos = this.leerBaseDatos();
    return datos.historial;
  }

  getHistorialById(id: string) {
    const datos = this.leerBaseDatos();
    for (let i = 0; i < datos.historial.length; i++) {
      if (datos.historial[i].id === id) {
        return datos.historial[i];
      }
    }
    return `Registro con id ${id} no encontrado.`;
  }

  getHistorialByidMascota(idMascota: string) {
    const datos = this.leerBaseDatos();
    let resultado: any[] = [];
    for (let i = 0; i < datos.historial.length; i++) {
      if (datos.historial[i].idMascota === idMascota) {
        resultado.push(datos.historial[i]);
      }
    }
    return resultado;
  }

  agregarRegistro(
    idMascota: string,
    fecha: string,
    tipo: string,
    descripcion: string,
    vacunaNombre: string,
  ) {
    const datos = this.leerBaseDatos();

    let existeMascota = false;
    for (let i = 0; i < datos.mascotas.length; i++) {
      if (datos.mascotas[i].id === idMascota) {
        existeMascota = true;
        break;
      }
    }

    if (!existeMascota) {
      return `La mascota con el id ${idMascota} no existe.`;
    }

    const fechaTurno = new Date(fecha);
    const ahora = new Date();

    if (fechaTurno > ahora) {
      return `No se puede agendar historial en fechas futuras.`;
    }

    const indicenuevoRegistro = datos.historial.length + 1;
    const nuevoRegistro: any = {};
    nuevoRegistro.id = String(indicenuevoRegistro);
    nuevoRegistro.idMascota = idMascota;
    nuevoRegistro.fecha = fecha;
    nuevoRegistro.tipo = tipo;
    nuevoRegistro.descripcion = descripcion;
    nuevoRegistro.vacunaNombre = vacunaNombre;

    datos.historial.push(nuevoRegistro);
    this.guardarBaseDatos(datos);
    return nuevoRegistro;
  }

  getChequeoAnual() {
    const datos = this.leerBaseDatos();
    const fechaActual = new Date();
    const resultado: any[] = [];

    const ultimoChequeoPorMascota: any = {};
    for (let i = 0; i < datos.historial.length; i++) {
      const registro = datos.historial[i];
      if (registro.tipo === 'chequeo') {
        if (!ultimoChequeoPorMascota[registro.idMascota]) {
          ultimoChequeoPorMascota[registro.idMascota] = registro;
        } else {
          const fechaNueva = new Date(registro.fecha);
          const fechaVieja = new Date(
            ultimoChequeoPorMascota[registro.idMascota].fecha,
          );
          if (fechaNueva > fechaVieja) {
            ultimoChequeoPorMascota[registro.idMascota] = registro;
          }
        }
      }
    }

    for (let i = 0; i < datos.mascotas.length; i++) {
      const mascota = datos.mascotas[i];
      const ultimoChequeo = ultimoChequeoPorMascota[mascota.id];
      let necesitaChequeo = false;

      if (!ultimoChequeo) {
        necesitaChequeo = true;
      } else {
        const fechaUltimo = new Date(ultimoChequeo.fecha);
        const diferencia = fechaActual.getTime() - fechaUltimo.getTime();
        const dias = diferencia / (1000 * 60 * 60 * 24);
        if (dias >= 365) {
          necesitaChequeo = true;
        }
      }

      if (necesitaChequeo) {
        let nombreDuenio = '';
        for (let j = 0; j < datos.duenios.length; j++) {
          const duenio = datos.duenios[j];
          if (duenio.id === mascota.idDuenio) {
            nombreDuenio = duenio.nombre;
            break;
          }
        }

        let fechaUltimoChequeo = '';
        if (ultimoChequeo && ultimoChequeo.fecha) {
          fechaUltimoChequeo = ultimoChequeo.fecha;
        }

        resultado.push({
          idMascota: mascota.id,
          nombreMascota: mascota.nombre,
          idDuenio: mascota.idDuenio,
          nombreDuenio: nombreDuenio,
          ultimoChequeo: fechaUltimoChequeo,
        });
      }
    }

    return resultado;
  }
}


import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class TurnosService {
  private rutaBaseDatos = 'src/base de datos/bd.json';

  private leerBaseDatos() {
    const datos = fs.readFileSync(this.rutaBaseDatos, 'utf-8');
    return JSON.parse(datos);
  }

  private guardarBaseDatos(datos: any) {
    fs.writeFileSync(this.rutaBaseDatos, JSON.stringify(datos, null, 2));
  }

  getTurnos() {
    const datos = this.leerBaseDatos();
    return datos.turnos;
  }

  getTurnoById(id: string) {
    const datos = this.leerBaseDatos();
    for (let i = 0; i < datos.turnos.length; i++) {
      if (datos.turnos[i].id === id) {
        return datos.turnos[i];
      }
    }
    return `Turno con id ${id} no encontrado.`;
  }

  registrarTurno(
    idMascota: string,
    idDuenio: string,
    fecha: string,
    motivo: string,
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
      return `La mascota no existe.`;
    }

    let existeDuenio = false;
    for (let i = 0; i < datos.duenios.length; i++) {
      if (datos.duenios[i].id === idDuenio) {
        existeDuenio = true;
        break;
      }
    }
    if (!existeDuenio) {
      return `El duenio no existe.`;
    }

    for (let i = 0; i < datos.mascotas.length; i++) {
      if (
        datos.mascotas[i].id === idMascota &&
        datos.mascotas[i].idDuenio !== idDuenio
      ) {
        return `El duenio no coincide con la mascota.`;
      }
    }
    const fechaTurno = new Date(fecha);
    const ahora = new Date();

    if (fechaTurno < ahora) {
      return `No se puede agendar un turno en fecha pasada.`;
    }
    const indiceNuevo = datos.turnos.length + 1;
    const nuevoTurno: any = {};
    nuevoTurno.id = String(indiceNuevo);
    nuevoTurno.idMascota = idMascota;
    nuevoTurno.idDuenio = idDuenio;
    nuevoTurno.fecha = fecha;
    nuevoTurno.motivo = motivo;
    nuevoTurno.estado = 'pendiente';

    for (let i = 0; i < datos.turnos.length; i++) {
      if (
        nuevoTurno.idMascota === datos.turnos[i].idMascota &&
        nuevoTurno.fecha === datos.turnos[i].fecha &&
        datos.turnos[i].estado === 'pendiente'
      ) {
        return `Esta mascota ya tiene un turno pendiente en esta fecha.`;
      }
    }

    datos.turnos.push(nuevoTurno);
    this.guardarBaseDatos(datos);
    return nuevoTurno;
  }

  actualizarTurno(id: string, cambios: any) {
    const datos = this.leerBaseDatos();
    let indice = -1;
    for (let i = 0; i < datos.turnos.length; i++) {
      if (datos.turnos[i].id === id) {
        indice = i;
        break;
      }
    }
    if (indice === -1) {
      return `Turno con id ${id} no encontrado.`;
    }

    if (cambios.fecha) {
      const fechaTurno = new Date(cambios.fecha);
      const ahora = new Date();

      if (fechaTurno < ahora) {
        return `No se puede actualizar un turno a una fecha pasada.`;
      }
      datos.turnos[indice].fecha = cambios.fecha;
    }
    if (cambios.motivo) {
      datos.turnos[indice].motivo = cambios.motivo;
    }

    if (cambios.estado) {
      let estados = ['pendiente', 'atendido', 'cancelado'];
      let existeEstado = false;
      for (let i = 0; i < estados.length; i++) {
        if (cambios.estado === estados[i]) {
          existeEstado = true;
          break;
        }
      }

      if (existeEstado) {
        if (datos.turnos[indice].estado === cambios.estado) {
          return `El estado nuevo no puede ser igual al estado anterior.`;
        }
        datos.turnos[indice].estado = cambios.estado;
      } else {
        return `Estado ingresado invalido.`;
      }
    }

    this.guardarBaseDatos(datos);
    return datos.turnos[indice];
  }

  eliminarTurno(id: string) {
    const datos = this.leerBaseDatos();
    let indice = -1;
    for (let i = 0; i < datos.turnos.length; i++) {
      if (datos.turnos[i].id === id) {
        indice = i;
        break;
      }
    }
    if (indice === -1) {
      return `Turno con id ${id} no encontrado.`;
    }

    for (let j = indice; j < datos.turnos.length - 1; j++) {
      datos.turnos[j] = datos.turnos[j + 1];
    }
    datos.turnos.length = datos.turnos.length - 1;

    this.guardarBaseDatos(datos);
    return `turno eliminado con exito.`;
  }
}

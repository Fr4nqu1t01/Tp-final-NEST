import { Injectable } from '@nestjs/common';

@Injectable()
export class MascotasService {
  mascotas: any[] = [];

  constructor() {
    let mascota = {
      id: "1",
      nombre: 'malcom',
      raza: 'border collie',
      edad: "5",
      idDueño: "1",
    };
    this.mascotas.push(mascota);
    mascota = {
      id: "2",
      nombre: 'rocky',
      raza: 'bulldog',
      edad: "3",
      idDueño: "3",
    };
    this.mascotas.push(mascota);

    mascota = {
      id: "3",
      nombre: 'luna',
      raza: 'pastor aleman',
      edad: "4",
      idDueño: "2",
    };
    this.mascotas.push(mascota);
  }

  getMascotas() {
    return this.mascotas;
  }

  getMascotaById(id: string) {
    for (let i = 0; i < this.mascotas.length; i++) {
      if (this.mascotas[i].id === id) {
        return this.mascotas[i];
      }
    }
    return `Mascota con id ${id} no encontrada`;
  }
}
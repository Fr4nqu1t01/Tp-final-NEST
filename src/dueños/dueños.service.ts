import { Injectable } from '@nestjs/common';

@Injectable()
export class DueñosService {
  dueños: any[] = [];
  constructor() {
    let dueño = {
      id: '1',
      nombre: 'Juan Perez',
      telefono: '2494234567',
      email: 'juanperez@gmail.com',
      idDueño: '1',
    };
    this.dueños.push(dueño);
    dueño = {
      id: '2',
      nombre: 'Maria Gomez',
      telefono: '2494234568',
      email: 'mariagomez@gmail.com',
      idDueño: '2',
    };
    this.dueños.push(dueño);
    dueño = {
      id: '3',
      nombre: 'Carlos Sanchez',
      telefono: '2494472166',
      email: 'carlossanchez@gmail.com',
      idDueño: '3',
    };
    this.dueños.push(dueño);
  }

  getdueños() {
    return this.dueños;
  }
  
  getDueñosById(id: string) {
    for (let i = 0; i < this.dueños.length; i++) {
      if (this.dueños[i].id === id) {
        return this.dueños[i];
      }
    }
    return `Dueño con id ${id} no encontrado`;
  }
}

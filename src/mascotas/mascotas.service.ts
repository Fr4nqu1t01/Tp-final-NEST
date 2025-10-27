import { Injectable } from '@nestjs/common';

@Injectable()
export class MascotasService {
    mascotas: any [] = [];
    constructor() {
        let mascotas = {
            "id": 1,
            "nombre" : "malcom",
            "raza" : "border collie",
            "edad" : 5,
            "idDueño": 1
        }
        this.mascotas.push(mascotas);
        mascotas = {
            "id": 2,
            "nombre" : "rocky",
            "raza" : "bulldog",
            "edad" : 3,
            "idDueño": 3
        }
        this.mascotas.push(mascotas);
        mascotas = { 
            "id": 3,
            "nombre" : "luna",
            "raza" : "pastor aleman",
            "edad" : 4,
            "idDueño": 2
        }
        this.mascotas.push(mascotas);
    }
}

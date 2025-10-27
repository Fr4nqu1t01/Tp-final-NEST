import { Module } from '@nestjs/common';

@Module({})
export class MascotasModule {
    id: number;
    nombre: string;
    raza: string;
    edad: number;
    idDueño: number;
}

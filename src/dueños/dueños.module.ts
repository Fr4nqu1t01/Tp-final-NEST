import { Module } from '@nestjs/common';

@Module({})
export class DueñosModule {
    id: number;
    nombre: string;
    telefono: string;
    email: string;
}

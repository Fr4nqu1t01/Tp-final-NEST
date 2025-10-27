import { Controller, Post } from '@nestjs/common';
import { MascotasService } from './mascotas.service';

@Controller('mascotas')
export class MascotasController {
    constructor(private readonly mascotasService: MascotasService) {}

    @Post()
    mostrarMascotas() {
        return this.mascotasService.mascotas;
    }
}
import { Controller, Get, Param } from '@nestjs/common';
import { MascotasService } from './mascotas.service';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Get('lista')
  mostrarMascotas() {
    return this.mascotasService.getMascotas();
  }

  @Get(':id')
  mostrarMascotasById(@Param('id') id: string) {
    return this.mascotasService.getMascotaById(id);
  }
}
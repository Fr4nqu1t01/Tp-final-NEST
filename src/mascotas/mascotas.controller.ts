import { Controller, Get, Param, Put, Body } from '@nestjs/common';
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
  
  @Put('registrar')
  registrarMascota(@Body() mascotaData: any) {
    return this.mascotasService.registrarMascota(
      mascotaData.nombre,
      mascotaData.raza,
      mascotaData.edad,
      mascotaData.idDueño,
    );
  }
}

import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { HistorialService } from '../historial/historial.service';
@Controller('mascotas')
export class MascotasController {
  constructor(
    private readonly mascotasService: MascotasService,
    private readonly historialService: HistorialService,
  ) {}

  @Get('lista')
  getMascotas() {
    return this.mascotasService.getMascotas();
  }
  @Get('lista/:id')
  getMascotaById(@Param('id') id: string) {
    return this.mascotasService.getMascotaById(id);
  }
  @Post()
  registrarMascota(@Body() mascotaData: any) {
    return this.mascotasService.registrarMascota(
      mascotaData.nombre,
      mascotaData.raza,
      mascotaData.edad,
      mascotaData.idDuenio,
    );
  }
  @Get('historial/:id')
  historial(@Param('id') id: string) {
    return this.historialService.getHistorialByidMascota(id);
  }
}

import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { HistorialService } from './historial.service';

@Controller('historial')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  @Get('lista')
  listar() {
    return this.historialService.getHistorial();
  }

  @Get('lista/:id')
  obtener(@Param('id') id: string) {
    return this.historialService.getHistorialById(id);
  }

  @Get('mascota/:idMascota')
  getHistorialByMascotaId(@Param('idMascota') idMascota: string) {
    return this.historialService.getHistorialByidMascota(idMascota);
  }

  @Get('chequeos-anuales')
  getChequeoAnual(){
    return this.historialService.getChequeoAnual()
  }

  @Post()
  crearRegistro(@Body() body: any) {
    return this.historialService.agregarRegistro(
      body.idMascota,
      body.fecha,
      body.tipo,
      body.descripcion,
      body.vacunaNombre,
    );
  }
}

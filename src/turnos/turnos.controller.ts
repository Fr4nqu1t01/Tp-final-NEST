import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { TurnosService } from './turnos.service';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Get('lista')
  listarTurnos() {
    return this.turnosService.getTurnos();
  }

  @Get(':id')
  obtenerTurnoById(@Param('id') id: string) {
    return this.turnosService.getTurnoById(id);
  }

  @Post()
  crearTurno(@Body() body: any) {
    return this.turnosService.registrarTurno(body.idMascota, body.idDuenio, body.fecha, body.motivo);
  }

  @Put(':id')
  actualizarTurno(@Param('id') id: string, @Body() body: any) {
    return this.turnosService.actualizarTurno(id, body);
  }

  @Delete(':id')
  eliminarTurno(@Param('id') id: string) {
    return this.turnosService.eliminarTurno(id);
  }
}

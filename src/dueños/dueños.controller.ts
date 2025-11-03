import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { DueñosService } from './dueños.service';

@Controller('duenios')
export class DueñosController {
    constructor(private readonly dueñosService: DueñosService) {}

    @Get('lista')
    mostrarDueños() {
        return this.dueñosService.getDueños();
    }

    @Get(':id')
    getDueñoById(@Param('id') id: string) {
        return this.dueñosService.getDueñosById(id);
    }

    @Put('registrar')
    registrarDueño(@Body() dueñoData: any) {
        return this.dueñosService.registrarDueño(
            dueñoData.nombre,
            dueñoData.telefono,
            dueñoData.email,
            dueñoData.idDueño
        );
    }
}
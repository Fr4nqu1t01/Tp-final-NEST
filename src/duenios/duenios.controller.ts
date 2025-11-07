import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { DueniosService } from './duenios.service';

@Controller('duenios')
export class DueniosController {
    constructor(private readonly DueniosService: DueniosService) {}

    @Get('lista')
    mostrarDuenios() {
        return this.DueniosService.getDuenios();
    }

    @Get(':id')
    getDuenioById(@Param('id') id: string) {
        return this.DueniosService.getDueniosById(id);
    }

    @Post('registrar')
    registrarDuenio(@Body() DuenioData: any) {
        return this.DueniosService.registrarDuenio(
            DuenioData.nombre,
            DuenioData.telefono,
            DuenioData.email
        );
    }
}
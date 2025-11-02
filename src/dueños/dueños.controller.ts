import { Controller, Get, Param } from '@nestjs/common';
import { DueñosService } from './dueños.service';

@Controller('duenios')
export class DueñosController {
    constructor(private readonly dueñosService: DueñosService) {}

    @Get('lista')
    mostrarDueños() {
        return this.dueñosService.getdueños();
    }

    @Get(':id')
    getDueñoById(@Param('id') id: string) {
        return this.dueñosService.getDueñosById(id);
    }
}

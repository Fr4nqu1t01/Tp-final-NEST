import { Controller, Post } from '@nestjs/common';
import { DueñosService } from './dueños.service';

@Controller('dueños')
export class DueñosController {
    constructor(private readonly dueñosService: DueñosService) {}

    @Post()
    mostrarDueño() {
        return this.dueñosService.dueños;
    }
}

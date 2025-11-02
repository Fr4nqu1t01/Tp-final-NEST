import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DueñosController } from './dueños/dueños.controller';
import { DueñosService } from './dueños/dueños.service';
import { DueñosModel } from './dueños/dueños.model';
import { MascotasController } from './mascotas/mascotas.controller';
import { MascotasService } from './mascotas/mascotas.service';
import { MascotasModel } from './mascotas/mascotas.model';

@Module({
  imports: [DueñosModel, MascotasModel],
  controllers: [AppController, DueñosController, MascotasController],
  providers: [AppService, DueñosService, MascotasService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DueñosController } from './dueños/dueños.controller';
import { DueñosService } from './dueños/dueños.service';
import { DueñosModule } from './dueños/dueños.module';
import { MascotasController } from './mascotas/mascotas.controller';
import { MascotasService } from './mascotas/mascotas.service';
import { MascotasModule } from './mascotas/mascotas.module';

@Module({
  imports: [DueñosModule, MascotasModule],
  controllers: [AppController, DueñosController, MascotasController],
  providers: [AppService, DueñosService, MascotasService],
})
export class AppModule {}

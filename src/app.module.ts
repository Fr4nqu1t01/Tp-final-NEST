import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DueniosController } from './duenios/duenios.controller';
import { DueniosService } from './duenios/duenios.service';
import { DueniosModule } from './duenios/duenios.model';
import { MascotasController } from './mascotas/mascotas.controller';
import { MascotasService } from './mascotas/mascotas.service';
import { MascotasModule } from './mascotas/mascotas.model';
import { TurnosController } from './turnos/turnos.controller';
import { TurnosService } from './turnos/turnos.service';
import { TurnosModule } from './turnos/turnos.model';
import { HistorialController } from './historial/historial.controller';
import { HistorialService } from './historial/historial.service';
import { HistorialModule } from './historial/historial.module';

@Module({
  imports: [DueniosModule, MascotasModule, TurnosModule, HistorialModule],
  controllers: [AppController, DueniosController, MascotasController, TurnosController, HistorialController],
  providers: [AppService, DueniosService, MascotasService, TurnosService, HistorialService],
})
export class AppModule {}

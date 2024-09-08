import { Module } from '@nestjs/common';
import { WorkSchedulesService } from './work-schedules.service';
import { WorkSchedulesController } from './work-schedules.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkSchedule, WorkScheduleSchema } from './entities/work-schedule.entity';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: WorkSchedule.name,
        schema: WorkScheduleSchema
      }
    ])
  ],
  controllers: [WorkSchedulesController],
  providers: [WorkSchedulesService],
  exports: [ MongooseModule ]
})
export class WorkSchedulesModule {}

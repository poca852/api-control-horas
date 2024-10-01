import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { WorkSchedulesService } from './work-schedules.service';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';
import { UpdateWorkScheduleDto } from './dto/update-work-schedule.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('work-schedules')
export class WorkSchedulesController {
  constructor(private readonly workSchedulesService: WorkSchedulesService) {}

  @Post()
  create(
    @Body() createWorkScheduleDto: CreateWorkScheduleDto,
    @Query('action') action: string
  ) {
    return this.workSchedulesService.create(createWorkScheduleDto, action);
  }

  @Get()
  findAll() {
    return this.workSchedulesService.findAll();
  }

  @Get(':idUser')
  findByUser(
    @Param('idUser', ParseMongoIdPipe) id: string,
    @Query('month', ParseIntPipe) month: number )
  {
    return this.workSchedulesService.findByUser(id, month);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkScheduleDto: UpdateWorkScheduleDto) {
    return this.workSchedulesService.update(+id, updateWorkScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workSchedulesService.remove(+id);
  }
}

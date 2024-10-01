import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';
import { UpdateWorkScheduleDto } from './dto/update-work-schedule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WorkSchedule } from './entities/work-schedule.entity';
import { Model } from 'mongoose';

@Injectable()
export class WorkSchedulesService {

  constructor(
    @InjectModel(WorkSchedule.name)
    private WorkSheduleModel: Model<WorkSchedule>
  ) { }

  async create(createWorkScheduleDto: CreateWorkScheduleDto, action: string) {

    const workSchedule = await this.WorkSheduleModel.findOne({
      workDate: createWorkScheduleDto.workDate
    })

    if (action === 'entrada') {
      if (workSchedule) {
        throw new BadRequestException('Ya reportaste tu hora de entrada')
      }
      
      await this.WorkSheduleModel.create(createWorkScheduleDto);
      
      return { ok: true }
    }

    if(!workSchedule && action === 'salida'){
      throw new BadRequestException('No puedes finalizar una jornada sin haberla iniciado')
    }
    
    if(workSchedule.hoursWorked){
      throw new BadRequestException('Ya reportaste tu hora de salida')
    }



    const checkInTime = new Date(workSchedule.checkInTime)
    const checkOutTime = new Date(createWorkScheduleDto.checkOutTime);

    if (isNaN(checkInTime.getTime()) || isNaN(checkOutTime.getTime())) {
      throw new Error('Fecha de entrada o salida inválida');
    }
    
    const differenceInMS = checkOutTime.getTime() - checkInTime.getTime();
    const hoursWorked = differenceInMS / (1000 * 60 * 60);

    workSchedule.checkOutTime = createWorkScheduleDto.checkOutTime;
    workSchedule.hoursWorked = hoursWorked;

    await workSchedule.save();

    return {ok: true}

  }

  findAll() {
    return `This action returns all workSchedules`;
  }

  async findByUser(id: string, month: number) {
    
    const workSchedules = await this.WorkSheduleModel.find({
      employeeId: id
    })

    const filter = this.filterByMonth(workSchedules, month)
  
    return filter.reverse();

  }

  update(id: number, updateWorkScheduleDto: UpdateWorkScheduleDto) {
    return `This action updates a #${id} workSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} workSchedule`;
  }

  public filterByMonth = (workSchedules: any[], month: number) => {
    return workSchedules.filter(schedule => {
      return schedule.workDate.getMonth() === month && schedule.workDate.getFullYear() === 2024;
    });
  }
}

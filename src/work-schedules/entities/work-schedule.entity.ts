import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Employe } from 'src/employees/entities/employees.entity';

@Schema()
export class WorkSchedule extends Document {

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employe'
  })
  employeeId: Employe;

  @Prop({
    type: Date,
    required: true
  })
  workDate: Date;

  @Prop({
    type: Date
  })
  checkInTime: Date;

  @Prop({
    type: Date
  })
  checkOutTime: Date;

  @Prop({
    type: Number
  })
  hoursWorked: Number;

  @Prop({
    type: Boolean
  })
  isReportGenerated: Boolean;

}

export const WorkScheduleSchema = SchemaFactory.createForClass( WorkSchedule );
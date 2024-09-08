import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from "mongoose";

@Schema()
export class Employe extends Document {

  @Prop({
    type: String,
    required: true
  })
  password: string;

  @Prop({
    type: String,
    required: true,
    trim: true
  })
  document: string;
  
  @Prop({
   type: String,
   required: true,
   uppercase: true,
   trim: true
  })
  fullName: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    uppercase: true,
    trim: true
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    trim: true
  })
  numberPhone: string;

  @Prop({
    type: String,
    required: true,
    enum: ['ADMIN', 'EMPLOYEE', 'SUPERADMIN'],
    default: 'Employee'
  })
  role: string;

  @Prop({
    type: Date,
    required: true,
    default: new Date()
  })
  hireDate: Date;

  @Prop({
    type: Boolean,
    default: true
  })
  isActive: Boolean;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employe);
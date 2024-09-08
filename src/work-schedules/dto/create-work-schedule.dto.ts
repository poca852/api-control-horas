import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsMongoId, IsNumber, IsOptional } from "class-validator";

export class CreateWorkScheduleDto {

  @IsMongoId()
  employeeId: string;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  workDate: Date;

  @IsOptional()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  checkInTime: Date;

  @IsOptional()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  checkOutTime: Date;

  @IsOptional()
  @IsNumber()
  hoursWorked: Number;

  @IsOptional()
  @IsBoolean()
  isReportGenerated: Boolean;
}

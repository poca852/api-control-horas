import { IsBoolean, IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

enum UserRole {

  Admin = 'ADMIN',
  Employee = 'EMPLOYEE',
  SuperAdmin = 'SUPERADMIN'

}

export class CreateEmployeeDto {

  @IsString()
  fullName: string;

  @IsString()
  username: string;

  @IsString()
  document: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  numberPhone: string;

  @IsString()
  @IsEnum(UserRole)
  role: UserRole;

  @IsDate()
  @IsOptional()
  hireDate: Date;

  @IsBoolean()
  isActive: boolean;

}

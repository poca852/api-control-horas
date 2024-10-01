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
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole = UserRole.Employee;

  @IsBoolean()
  @IsOptional()
  isActive: boolean = true;

}

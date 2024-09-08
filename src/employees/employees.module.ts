import { Module } from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Employe, EmployeeSchema } from '../employees/entities/employees.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Employe.name,
        schema: EmployeeSchema
      }
    ])
  ],
  controllers: [EmployeesController],
  providers: [EmployeeService],
  exports: [ MongooseModule, EmployeeService ]
})
export class EmployeesModule {}

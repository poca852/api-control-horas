import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../employees/dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt";
import { Employe } from './entities/employees.entity';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class EmployeeService {

  private logger = new Logger('EmployeeService');

  constructor(
    @InjectModel( Employe.name )
    private EmployeeModel: Model<Employe>
  ){}

  async create( createEmployeeDto: CreateEmployeeDto ) {

    try {
      
      const user = new this.EmployeeModel(createEmployeeDto);

      user.password = bcrypt.hashSync( createEmployeeDto.password, 10 );

      await user.save();

      return {
        ok: true,
        msg: `Usuario ${createEmployeeDto.fullName} creado con exito`
      };

    } catch (error) {

      this.handleExceptions(error);

    }

  }

  async findAll() {
    return await this.EmployeeModel.find()
  }

  async findOne(termino: string) {
   
    const employee = await this.EmployeeModel.findById(termino);

    if( !employee )
      throw new NotFoundException(`El empleado con el id ${termino} no existe`);

    return employee

  }

  update( id: number, updateEmpleadoDto: UpdateEmployeeDto ) {
    return `This action updates a #${id} empleado`;
  }

  remove(id: number) {
    return `This action removes a #${id} empleado`;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
       throw new BadRequestException(`Ya existe un usuario ${JSON.stringify(error.keyValue)}`);
    }

    this.logger.error(error);
    throw new InternalServerErrorException("Revisar el console.log")
 }

}

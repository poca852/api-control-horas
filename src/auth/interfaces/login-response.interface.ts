import { Employe } from '../../employees/entities/employees.entity';

export interface LoginResponse {
   user: Employe,
   token: string
}